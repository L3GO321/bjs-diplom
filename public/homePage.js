'use strict';

const newLogoutButton = new LogoutButton();
const exchangeRatesBoard = new RatesBoard();
const balanceMoney = new MoneyManager();
const listFavoritesWidget = new FavoritesWidget();

const getExchangeRates = () => {
    ApiConnector.getStocks(response => { 
        if (response.success) {
            exchangeRatesBoard.clearTable();
            exchangeRatesBoard.fillTable(response.data);
        }
    });    
}

const getFavoritesList = () => {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            listFavoritesWidget.clearTable();
            listFavoritesWidget.fillTable(response.data);
            balanceMoney.updateUsersList(response.data);
        }
    });
}

newLogoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

getExchangeRates();
setInterval(getExchangeRates, 60000);

balanceMoney.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            balanceMoney.setMessage(response.success, 'Баланс успешно пополнен');
        } else {
            balanceMoney.setMessage(response.success, response.error);
        }
    });
}

balanceMoney.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            balanceMoney.setMessage(response.success, 'Конвертация прошла успешно');
        } else {
            balanceMoney.setMessage(response.success, response.error);
        }
    });
}

balanceMoney.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            balanceMoney.setMessage(response.success, 'Перевод прошел успешно');
        } else {
            balanceMoney.setMessage(response.success, response.error);
        }
    });
}

getFavoritesList();

FavoritesWidget1.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            listFavoritesWidget.clearTable();
            listFavoritesWidget.fillTable(response.data);
            balanceMoney.updateUsersList(response.data);
            listFavoritesWidget.setMessage(response.success, 'Пользователь добавлен');
        } else {
            listFavoritesWidget.setMessage(response.success, response.error);
        }
    });
}

listFavoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            listFavoritesWidget.clearTable();
            listFavoritesWidget.fillTable(response.data);
            balanceMoney.updateUsersList(response.data);
            listFavoritesWidget.setMessage(response.success, 'Пользователь удален');
        } else {
            listFavoritesWidget.setMessage(response.success, response.error);
        }
    });
}