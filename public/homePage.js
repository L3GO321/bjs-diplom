'use strict';

const getUserInfo = response => {
    console.log('userData', response);

    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
}

const getExchangeRates = () => {
    const getRates = response => {
        console.log('ratesData', response);

        if (response.success) {
            RatesBoard1.clearTable();
            RatesBoard1.fillTable(response.data);
        }
    }

    ApiConnector.getStocks(response => getRates(response));    
}

const getFavoritesList = () => {
    const getList = response => {
        console.log('dataFavorites', response);

        if (response.success) {
            FavoritesWidget1.clearTable();
            FavoritesWidget1.fillTable(response.data);
            MoneyManager1.updateUsersList(response.data);
        }
    }

    ApiConnector.getFavorites(response => getList(response));
}

const LogoutButton1 = new LogoutButton();
const RatesBoard1 = new RatesBoard();
const MoneyManager1 = new MoneyManager();
const FavoritesWidget1 = new FavoritesWidget();

LogoutButton1.action = () => {
    const logout = response => {
        console.log('dataLogout', response);

        if (response.success) {
            location.reload();
        }
    }

    ApiConnector.logout(response => logout(response));
}

ApiConnector.current(response => getUserInfo(response));

getExchangeRates();
setInterval(() => getExchangeRates(), 60000);

MoneyManager1.addMoneyCallback = data => {
    const refillBalance = response => {
        console.log('dataBalance', response);

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            MoneyManager1.setMessage(response.success, 'Баланс успешно пополнен');
        } else {
            MoneyManager1.setMessage(response.success, response.error);
        }
    }

    ApiConnector.addMoney(data, response => refillBalance(response));
}

MoneyManager1.conversionMoneyCallback = data => {
    const convertBalance = response => {
        console.log('dataConvertBalance', response);

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            MoneyManager1.setMessage(response.success, 'Конвертация прошла успешно');
        } else {
            MoneyManager1.setMessage(response.success, response.error);
        }
    }

    ApiConnector.convertMoney(data, response => convertBalance(response));
}

MoneyManager1.sendMoneyCallback = data => {
    const sendMoney = response => {
        console.log('dataSendMoney', response);

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            MoneyManager1.setMessage(response.success, 'Перевод прошел успешно');
        } else {
            MoneyManager1.setMessage(response.success, response.error);
        }
    }

    ApiConnector.transferMoney(data, response => sendMoney(response));
}

getFavoritesList();

FavoritesWidget1.addUserCallback = data => {
    const addUser = response => {
        console.log('favoritesUsersData', response);

        if (response.success) {
            FavoritesWidget1.clearTable();
            FavoritesWidget1.fillTable(response.data);
            MoneyManager1.updateUsersList(response.data);
            FavoritesWidget1.setMessage(response.success, 'Пользователь добавлен');
        } else {
            FavoritesWidget1.setMessage(response.success, response.error);
        }
    }

    ApiConnector.addUserToFavorites(data, response => addUser(response));
}

FavoritesWidget1.removeUserCallback = data => {
    const removeUser = response => {
        console.log('removeUser', response);

        if (response.success) {
            FavoritesWidget1.clearTable();
            FavoritesWidget1.fillTable(response.data);
            MoneyManager1.updateUsersList(response.data);
            FavoritesWidget1.setMessage(response.success, 'Пользователь удален');
        } else {
            FavoritesWidget1.setMessage(response.success, response.error);
        }
    }

    ApiConnector.removeUserFromFavorites(data, response => removeUser(response));
}