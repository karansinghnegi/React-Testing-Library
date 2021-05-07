import { rest } from 'msw';

export const handlers = [
    // For Scoops
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Chocolate', imagePah: '/images/chocolate.png' },
                { name: 'Vanilla', imagePah: '/images/vanilla.png' }
            ])
        );
    }),
    // For Toppings
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Cherries', imagePath: '/images/cherries.png' },
                { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
                { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' }
            ])
        );
    })
];
