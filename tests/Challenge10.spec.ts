import {test, expect, chromium} from "@playwright/test";
import {faker} from "@faker-js/faker";

test("Verify End to End purchase flow", async({})=>{

    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole('link', {name: 'Sign in'}).click();
    await page.getByRole('link', {name: 'Register your account'}).click();

    const firstName = page.locator('#first_name');
    const name = faker.person.firstName();
    await firstName.fill(name);

    const lastName = page.locator('#last_name');
    const lastname = faker.person.lastName();
    await lastName.fill(lastname);

    await page.getByPlaceholder("YYYY-MM-DD").fill('2002-12-31');
    await page.locator('select[data-test="country"]').selectOption('Brazil');

    const postalCode = page.locator('#postal_code');
    const postal = faker.location.zipCode();
    await postalCode.fill(postal);

    const house = page.locator('#house_number');
    const home = faker.location.buildingNumber();
    await house.fill(home);

    const streetAdress = page.locator('#street');
    const street = faker.location.streetAddress();
    await streetAdress.fill(street);

    const City = page.locator('#city');
    const city = faker.location.city();
    await City.fill(city);

    const State = page.locator('#state');
    const state = faker.location.state();
    await State.fill(state);

    const Phone = page.locator('#phone');
    const phone = faker.phone.number({ style: 'mobile' });
    await Phone.fill(phone);

    const Email = page.locator('#email');
    const email = faker.internet.email();
    await Email.fill(email);
    console.log(email);

    const pwd = page.locator('#password');
    const password = '1133@Vinay';
    await pwd.fill(password);

    await page.getByRole('button', {name: 'Register'}).click();

    await page.waitForLoadState();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
    await page.locator('#email').fill(email);
    await page.getByPlaceholder("Your password").fill(password);
    await page.locator('input[data-test="login-submit"]').click();

    await expect(page.getByRole('heading', {name: 'My account'})).toBeVisible();
    await page.getByRole('link', {name: 'Home'}).click();
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');

    await page.locator('#search-query').fill('Hammer');
    await page.getByRole('button', {name: 'Search'}).click();
    
    await expect(page.locator('[data-test="product-name"]').first()).toBeVisible({timeout: 15000});
    const allproducts =  page.locator('[data-test="product-name"]');
    const productNames = await allproducts.allInnerTexts();
    console.log(productNames);

    await page.locator('[data-test="product-name"]').nth(0).click();
    const firstHammer = page.locator('[data-test="product-name"]');
    const hammerName = await firstHammer.innerText();
    console.log(hammerName);

    const hammer = await page.locator('h1[data-test="product-name"]').innerHTML();
    console.log("Hammer name after clicking is:",hammer);
    expect(hammer).toContain(hammerName);

    await page.locator('#btn-add-to-cart').click();
    await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeVisible();
    await page.locator('a[data-test="nav-cart"]').click();

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
    const cartProduct = page.locator('[data-test="product-title"]');
    await expect(cartProduct).toHaveText('Claw Hammer with Shock Reduction Grip')


    const productPrice = await page.locator('span[data-test="product-price"]').innerText();
    console.log(productPrice);
    expect(productPrice).toBe('$13.41');

    const productQuantity = page.locator('input[data-test="product-quantity"]');
    await expect(productQuantity).toHaveAttribute('min', '1');
    await productQuantity.clear();
    await productQuantity.pressSequentially('2');

    const total = page.locator('td[data-test="cart-total"]');
    //await expect(total).not.toHaveText('$13.41');
    console.log(await total.innerText());

    await page.locator('svg[data-icon="xmark"]').click();

    await expect(page.getByRole('alert', {name: 'Product deleted'})).toBeVisible();
    await expect(page.getByText('The cart is empty. Nothing to display.')).toBeVisible();

    await browser.close();

});