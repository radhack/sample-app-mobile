import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import InventoryItemScreen from '../screenObjects/inventoryItem';
import AppHeader from '../screenObjects/appHeader';
import { LOGIN_USERS } from '../helpers/e2eConstants';

describe('Inventory Item Page', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.waitForIsShown();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);
    InventoryListScreen.waitForIsShown();
  });

  it('should show the details of the selected swag', () => {
    const selectedSwagItemText = InventoryListScreen.getSwagItemText(1);

    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsShown();

    expect(selectedSwagItemText).toContain(InventoryItemScreen.getSwagItemText(), 'The details of the selected swag item was not correct');
  });

  it('should be able to add a swag item to the cart from the details page', () => {
    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsShown();

    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');

    InventoryItemScreen.addSwagItemToCart();

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');
  });

  it('should be able to remove a swag item from the cart from the details page added in the inventory page', () => {
    InventoryListScreen.addSwagItemToCart(1);
    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsShown();

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryItemScreen.removeSwagItemFromCart();

    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
  });

  it('should be able to remove a swag item from the cart from the details page', () => {
    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsShown();

    InventoryItemScreen.addSwagItemToCart();

    expect(AppHeader.getCartAmount()).toContain(1, 'Cart amount is not correct');

    InventoryItemScreen.removeSwagItemFromCart();

    expect(AppHeader.getCartAmount()).not.toContain(1, 'Cart amount is not correct');
  });

  it('should be able to get back from the swag details page through the back button', () => {
    InventoryListScreen.openSwagItemDetails(1);
    InventoryItemScreen.waitForIsShown();

    InventoryItemScreen.goBackToAllSwagItems();
    InventoryListScreen.waitForIsShown();

    expect(InventoryItemScreen.isShown()).toEqual(false, 'The swag items details page should not be visible');
  });
});
