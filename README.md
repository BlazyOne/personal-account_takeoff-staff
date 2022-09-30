# Инструкции по запуску

Использовалась версия node v16.13.0

Установить node, если еще не установлен.

Скачать архив с проектом с гитхаба (Code -> Download ZIP).

Открыть папку проекта в консоли.

Установить зависимости командой "npm i".

Запустить инстанс json-server, используемый в проекте для эмуляции работы с сервером с помощью команды "npm run json-server" (под капотом используется npx, см. раздел scripts файла package.json).

Открыть папку с проектом в новом окне консоли и запустить команду "npm start". Проект будет запущен по адресу http://localhost:3000

Сперва откроется экран входа. В проекте в текущий момент нет фуннкционала регистрации. Доступны два пользователя: john_doe@mail.com и jane_doe@mail.com. У обоих пароль 12345. При неверных почте и пароле, ошибка пока не выводится.

При редактировании контактов результаты сохраняются в файле db.json. Если возникнет желание вернуть дефолтные данные, можно скопировать их в этот файл из файла db-copy.json.

Проект создан при помощи create-react-app. Использовались Redux, And-Design, axios и другие библиотеки.

В проекте пока нет лоадеров и вывода ошибок, так как используется json-server, и в этом нет большой необходимости. Модалки было бы неплохо еще сделать чтобы они не целиком скроллились при непомещаемости на экране, а только контент. Возможно в будущем этот функционал будет добавлен.

Пароль в json-server в данный момент хранится в незашифрованном виде. Вероятно с json-server можно работать и с шифрованием, но я такой информации по проекту не встретил. И так как мы просто эмулируем сервер этим инструментом, в демонстрационных целях, это тут и не нужно. В реальной разработке это была бы забота бэкендера.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
