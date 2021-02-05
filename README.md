# Rest-bearer-node

Rest api, with bearer auth.

## Installation

Use the package manager [npm](https://npmjs.com/) to install Rest-bearer-node.

```bash
npm install
```

## Task

- Авторизация по bearer токену (/info, /latency, /logout, /file(все роуты) );
- Настроить CORS для доступа с любого домена;
- DB – Mysql;
- Токен создавать при каждой авторизации, действителен 10 минут. Продлевать по
  истечению, с помощью refresh токена;
- Реализовать на основе фреймворка express js;

## Methods

#### Во все роутеры необходимо приложить заголовок с access_token.

- /signin [POST] - запрос bearer токена по id и паролю

```json
{
  "user": user,
  "password": password
}
```

- /signin/new_token [POST] - обновление bearer токена по refresh токену

```json
{
  "token": token
}
```

- /signup [POST] - регистрация нового пользователя

```json
{
  "user": user,
  "password": password
}
```

- /file/upload [POST] - добавление нового файла в систему и запись
  параметров файла в базу: название, расширение, MIME type, размер, дата
  загрузки

```json
{
  "file": file
}
```

- /file/list [GET] выводит список файлов и их параметров из базы с
  использованием пагинации с размером страницы, указанного в
  передаваемом параметре list_size, по умолчанию 10 записей на страницу,
  если параметр пустой. Номер страницы указан в параметре page, по
  умолчанию 1, если не задан;

```json
/file/list?list_size=n
```

- /file/delete/:id [DELETE] - удаляет документ из базы и локального
  хранилища
- /file/:id [GET] - вывод информации о выбранном файле;
- /file/download/:id [GET] - скачивание конкретного файла;
- /file/update/:id [PUT] - обновление текущего документа на новый в базе и
  локальном хранилище;

```json
{
  "file": file
}
```

- /info [GET] - возвращает id пользователя;
- /logout [GET] - выйти из системы;

## Usage

```javascript
nodemon #dev
node index #prod
```
