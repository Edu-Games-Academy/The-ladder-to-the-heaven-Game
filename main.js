var prices = [
    {},
    {y: 1E8, n: 0.5},
    {y: 2E8, n: 0.5},
    {y: 3E8, n: 0.5},
    {y: 4E8, n: 0.5},
    {},
    {y: 5E8, n: 0.25},
    {y: 6E8, n: 0.25},
    {y: 7E8, n: 0.25},
    {y: 8E8, n: 0.25},
    {},
    {y: 20E8, n: -20E8},
    {y: 22E8, n: -22E8},
    {y: 18E8, n: -18E8},
    {y: 24E8, n: -24E8}
];

var timer = [
    60,
    90,
    90
];

var team = [
    {target: $('.team[data-team="1"]'), position: 0, money: 1E8},
    {target: $('.team[data-team="2"]'), position: 0, money: 1E8},
    {target: $('.team[data-team="3"]'), position: 0, money: 1E8},
    {target: $('.team[data-team="4"]'), position: 0, money: 1E8}
];

var currentTeam = 0;
var currentQuestion = 0;
var currentStage = 0;
var MAX_STAGE = 3;

$(window).on('load', function () {
    var docHeight = $(document).height();
    $("html, body").animate({scrollTop: docHeight}, 1000);
    for (var i = 0; i < team.length; i++) {
        team[i].target.css('top', docHeight - 162 + positionTeam(i));
        updateMoney(i);
    }
    $('#response').hide();
    $('#main').removeData('init');
    moveToNextRound();
});

function positionTeam(teamNum) {
    return 15 + 30 * teamNum;
}

function rollDice() {
    $('#roll-dice').attr('disabled', 'true');
    $('#question').hide();
    $('#response').hide();
    $('#answer').hide();

    var value = Math.floor(Math.random() * 4) + 1;
    var dice = $('#dice');

    dice.css('background-image', 'url(img/Die_' + value + '.png)');
    dice.show();

    move(currentTeam, value);

    setTimeout(nextQuestion, 500 * value + 300);
}

function move(teamNum, step) {
    var t = team[teamNum];
    var stage = t.position += step;
    var location = $('.card[data-position="' + stage + '"]').position().top;
    var teamLocation = location + positionTeam(teamNum);

    t.target.animate({
        top: teamLocation + "px"
    }, {
        duration: 500 * step,
        step: function (now, fx) {
            $("html, body").scrollTop(now - positionTeam(teamNum));
        }
    });
}

function nextQuestion() {
    currentQuestion++;
    $('#question img').attr('src', 'qna/question_' + currentQuestion + '.png');
    $('#question').show();
    $('#response').show();
    showTimer();
}

function showTimer() {
    var clock = $('#clock');
    clock.removeClass('d-none');
    var time = timer[currentStage - 1];
    var timeId = setInterval(function () {
        clock.text(time--);
        if (time < 0) {
            clock.addClass('d-none');
            clearInterval(timeId);
        }
    }, 1000);
}

function response(isCorrect) {
    $('#response').hide();

    takePrice(isCorrect);
    nextPlayer();

    if (finishedOneRound()) {
        moveToNextRound()
    }

    $('#roll-dice').removeAttr('disabled');
    $('#dice').hide();
}

function showAnswer() {
    $('#answer img').attr('src', 'qna/answer_' + currentQuestion + '.png');
    $('#answer').show();
}

function takePrice(isApplied) {
    if (isApplied) {
        takePriceEffect();
    }
    var price = prices[team[currentTeam].position];
    var action = isApplied === true ? price.y : price.n;
    if (Math.abs(action) > 1) {
        team[currentTeam].money += action;
    } else {
        team[currentTeam].money *= action;
    }
    updateMoney(currentTeam);
}

function takePriceEffect() {
    var target = $('[data-position="' + team[currentTeam].position + '"]');
    var priceObj = target.clone();

    priceObj.css('top', '2px');
    priceObj.css('left', '5px');
    priceObj.css('position', 'fixed');
    priceObj.css('z-index', '99');
    $('body').append(priceObj);

    priceObj.animate({
        top: '10px',
        left: ($(window).width() - 400) + 'px'
    }, 2000, function () {
        priceObj.remove();
    });
}

function updateMoney(teamNum) {
    var money = Number(team[teamNum].money);
    $('#status-container [data-team="' + (teamNum + 1) + '"]').text(money.toLocaleString('vi'));
}

function nextPlayer() {
    currentTeam = (currentTeam + 1) % team.length;
    $('#current-team').text(currentTeam + 1);
}

function finishedOneRound() {
    return currentTeam === 0;
}

function moveToNextRound() {
    currentStage++;
    var destination = 5 * (currentStage - 1);
    for (var i = 0; i < team.length; i++) {
        move(i, destination - team[i].position);
    }
    if (currentStage <= MAX_STAGE) {
        displayForm(currentStage);
    } else {
        endGame();
    }
}

function displayForm(formNumber) {
    $('#form-container img').attr('src', 'qna/form_' + formNumber + '.png');
}

function endGame() {
    $('#center-container').hide();
    $('#right-panel>div:not(#status-container)').hide();
}