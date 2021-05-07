import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('displays image for each scoop from the server', async () => {
    render(<Options optionType="scoops" />);

    // find the images: It's happening asynchornous hence, we are using findBy
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt test of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each toppings option from server', async () => {
    // Mock Service Worker will return three toppings from server
    render(<Options optionType="toppings" />);

    // find images, expect 3 based on what msw returns
    const images = await screen.findAllByRole('img', { name: /topping$/i });
    expect(images).toHaveLength(3);

    // check the actual alt text for the images
    const imageTitles = images.map((img) => img.alt);
    expect(imageTitles).toEqual([
        'Cherries topping',
        'M&Ms topping',
        'Hot fudge topping'
    ]);
});
