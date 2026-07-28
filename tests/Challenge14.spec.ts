import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

test("Verify adding products to cart", async ({ page }) => {

    await page.goto('https://automationexercise.com/');
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    const userName = page.locator('input[data-qa="signup-name"]');
    const name = faker.person.firstName();
    await userName.fill(name);

    const userEmail = page.locator('input[data-qa="signup-email"]');
    const email = faker.internet.email();
    await userEmail.fill(email);

    await page.getByRole('button', { name: 'Signup' }).click();

    const title = page.locator('input#id_gender1');
    await expect(title).toBeEnabled();
    await expect(title).toBeVisible();
    await title.check();
    await expect(title).toBeChecked();

    const firstName = page.locator('[data-qa="name"]');
    await expect(firstName).toHaveValue(name);

    const emailAdress = page.locator('input[data-qa="email"]');
    await expect(emailAdress).toHaveValue(email);

    const password = page.locator('input[data-qa="password"]');
    const pwd = faker.internet.password();
    await password.fill(pwd);

    const dobDate = page.locator('select[data-qa="days"]');
    await dobDate.click();
    await dobDate.selectOption('31');
    await expect(dobDate).toHaveValue('31');
    const dobMonth = page.locator('select[data-qa="months"]');
    await dobMonth.click();
    await dobMonth.selectOption('December');
    await expect(dobMonth).toHaveValue('12');
    const dobYear = page.locator('select[data-qa="years"]');
    await dobYear.click();
    await dobYear.selectOption('2000');
    await expect(dobYear).toHaveValue('2000');

    const newsletter = page.locator('input#newsletter');
    await expect(newsletter).toBeVisible();
    await newsletter.check();
    await expect(newsletter).toBeChecked();

    const specialOffer = page.locator('input#optin');
    await expect(specialOffer).toBeVisible();
    await specialOffer.check();
    await expect(specialOffer).toBeChecked();

    await expect(page.getByRole('heading', { name: 'Address Information' })).toBeVisible();

    const fName = page.locator('input[data-qa="first_name"]');
    const fname = faker.person.firstName();
    await fName.fill(fname);

    const lastName = page.locator('input[data-qa="last_name"]');
    const lName = faker.person.lastName();
    await lastName.fill(lName);

    await page.locator('input[data-qa="company"]').fill("Netflix");

    const Useradress = page.locator('input[data-qa="address"]');
    const adress = faker.location.streetAddress();
    await Useradress.fill(adress);

    const secondAdress = page.locator('input[data-qa="address2"]');
    const sAdress = faker.location.secondaryAddress();
    await secondAdress.fill(sAdress);

    const country = page.locator('select[data-qa="country"]');
    await expect(country).toBeVisible();
    await country.click();
    await country.selectOption('New Zealand');
    await expect(country).toHaveValue('New Zealand');

    const Userstate = page.locator('input[data-qa="state"]');
    const state = faker.location.state();
    await Userstate.fill(state);

    const userCity = page.locator('input[data-qa="city"]');
    const city = faker.location.city();
    await userCity.fill(city);

    const userZpi = page.locator('input[data-qa="zipcode"]');
    const zpi = faker.location.zipCode();
    await userZpi.fill(zpi);

    const userPhone = page.locator('input[data-qa="mobile_number"]');
    const phone = faker.phone.number({ style: 'mobile' });
    await userPhone.fill(phone);

    await page.getByRole('button', { name: 'Create Account' }).click();

    await page.waitForLoadState();
    await expect(page).toHaveURL('https://automationexercise.com/account_created');
    await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    await expect(page).toHaveTitle('Automation Exercise');

    //Search for "Blue Top".
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL('https://automationexercise.com/products');

    const searchText = page.locator('input#search_product');
    await searchText.fill('Blue Top');
    const searchButton = page.locator('button#submit_search');
    await searchButton.click();

    const result = page.locator('.single-products .productinfo');
    await result.hover();
    const blueText = await page.locator('.overlay-content p').innerText();
    expect(blueText).toContain('Blue');
    console.log(blueText);
    const addtoCart = page.locator('.overlay-content .add-to-cart');
    await expect(addtoCart).toBeVisible();
    await addtoCart.click();

    await expect(page.locator('.modal-title', { hasText: 'Added!' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();


    await searchText.clear();
    await searchText.pressSequentially('Polo');
    await searchButton.click();

    const poloResult = page.locator('.single-products .productinfo');
    await poloResult.hover();
    const poloText = await page.locator('.overlay-content p').innerText();
    expect(poloText).toContain('Polo T-Shirts');
    console.log(poloText);
    const poloaddtoCart = page.locator('.overlay-content .add-to-cart');
    await expect(poloaddtoCart).toBeVisible();
    await poloaddtoCart.click();

    const viewCart = page.locator('.text-center u');
    await expect(viewCart).toBeVisible();
    await viewCart.click();

    //Verify cart quantity.
    const cartItems = page.locator('#cart_info tbody tr');
    const cartItemscount = await cartItems.count();
    expect(cartItemscount).toBe(2);
    //Remove one product.
    await page.locator('.cart_quantity_delete').nth(1).click();
    await expect(page.locator('.cart_quantity_delete').nth(1)).not.toBeVisible();
    //Verify total price updates.
    const totalPrice = page.locator('p.cart_total_price');
    await expect(totalPrice).toContainText('Rs. 500');

    //Proceed to checkout.
    const checkout = page.locator('a.check_out').filter({ hasText: 'Proceed To Checkout' });
    await expect(checkout).toBeVisible();
    await checkout.click();
    //Verify delivery address.
    const deliveryAdress = page.locator('#address_delivery');
    await expect(deliveryAdress).toContainText(fname);
    await expect(deliveryAdress).toContainText(lName);
    await expect(deliveryAdress).toContainText(adress);
    await expect(deliveryAdress).toContainText(city);
    await expect(deliveryAdress).toContainText(state);
    await expect(deliveryAdress).toContainText(zpi);
    await expect(deliveryAdress).toContainText(phone);
    const billingAdress = page.locator('#address_invoice');
    await expect(billingAdress).toContainText(fname);
    await expect(billingAdress).toContainText(lName);
    await expect(billingAdress).toContainText(adress);
    await expect(billingAdress).toContainText(city);
    await expect(billingAdress).toContainText(state);
    await expect(billingAdress).toContainText(zpi);
    await expect(billingAdress).toContainText(phone);

    //Logout.
    await page.getByRole('link', { name: 'Logout' }).click();
    //Verify login page.
    await expect(page).toHaveURL('https://automationexercise.com/login');
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();











});