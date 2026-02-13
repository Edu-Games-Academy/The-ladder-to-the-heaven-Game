/**
 * Ladder Positions Configuration
 * Extracted from legacy index.html
 */

export interface LadderPosition {
    position: number;
    label: string;
    image: string;
    isCheckpoint: boolean;
}

/**
 * All 16 ladder positions with their metadata
 * Order is reversed from HTML (bottom to top)
 */
export const LADDER_POSITIONS: LadderPosition[] = [
    {
        position: 0,
        label: 'Lãi kép',
        image: '/images/ladder/start.png',
        isCheckpoint: true,
    },
    {
        position: 1,
        label: '100 triệu',
        image: '/images/ladder/money.jpg',
        isCheckpoint: false,
    },
    {
        position: 2,
        label: '200 triệu',
        image: '/images/ladder/money.jpg',
        isCheckpoint: false,
    },
    {
        position: 3,
        label: '300 triệu',
        image: '/images/ladder/money.jpg',
        isCheckpoint: false,
    },
    {
        position: 4,
        label: '400 triệu',
        image: '/images/ladder/money.jpg',
        isCheckpoint: false,
    },
    {
        position: 5,
        label: 'Lãi gửi hàng tháng',
        image: '/images/ladder/interest_rate.png',
        isCheckpoint: true,
    },
    {
        position: 6,
        label: '500 triệu',
        image: '/images/ladder/money_2.jpg',
        isCheckpoint: false,
    },
    {
        position: 7,
        label: '600 triệu',
        image: '/images/ladder/money_2.jpg',
        isCheckpoint: false,
    },
    {
        position: 8,
        label: '700 triệu',
        image: '/images/ladder/money_2.jpg',
        isCheckpoint: false,
    },
    {
        position: 9,
        label: '800 triệu',
        image: '/images/ladder/money_2.jpg',
        isCheckpoint: false,
    },
    {
        position: 10,
        label: 'Vay trả góp',
        image: '/images/ladder/loan.jpg',
        isCheckpoint: true,
    },
    {
        position: 11,
        label: 'Hà Nội',
        image: '/images/ladder/hanoi.jpg',
        isCheckpoint: false,
    },
    {
        position: 12,
        label: 'TP. HCM',
        image: '/images/ladder/hcm.png',
        isCheckpoint: false,
    },
    {
        position: 13,
        label: 'Đà Lạt',
        image: '/images/ladder/dalat.jpg',
        isCheckpoint: false,
    },
    {
        position: 14,
        label: 'Hà Giang',
        image: '/images/ladder/hagiang.jpg',
        isCheckpoint: false,
    },
    {
        position: 15,
        label: 'Về đích',
        image: '/images/ladder/finish.jpg',
        isCheckpoint: true,
    },
];
