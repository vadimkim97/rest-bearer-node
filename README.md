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

-- /signin [POST] - запрос bearer токена по id и паролю

Request:

```json
{
  "user": "user",
  "password": "password"
}
```

Response:

```json
{
  "token_type": "bearer",
  "access_token": "token",
  "refresh_token": "refresh_token"
}
```

-- /signin/new_token [POST] - обновление bearer токена по refresh токену

Request:

```json
{
  "token": "refresh_token"
}
```

Response:

```json
{
  "token_type": "bearer",
  "access_token": "token"
}
```

-- /signup [POST] - регистрация нового пользователя

Request:

```json
{
  "user": "user",
  "password": "password"
}
```

Response:

```json
{
  "token_type": "bearer",
  "access_token": "token",
  "refresh_token": "refresh_token"
}
```

-- /file/upload [POST] - добавление нового файла в систему и запись
параметров файла в базу: название, расширение, MIME type, размер, дата
загрузки

Request:

```json
{
  "file": "file"
}
```

Response:

```json
{
  "status": true,
  "message": "File is uploaded",
  "data": {
    "name": "document.docx",
    "extension": ".docx",
    "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "size": 10720,
    "uploadTimestamp": 1612593771052
  }
}
```

-- /file/list [GET] выводит список файлов и их параметров из базы с
использованием пагинации с размером страницы, указанного в
передаваемом параметре list_size, по умолчанию 10 записей на страницу,
если параметр пустой. Номер страницы указан в параметре page, по
умолчанию 1, если не задан;

```json
params - /file/list?list_size=n
```

Response:

```json
{
  "files": [
    {
      "id": 22,
      "fileName": "template_grant.docx",
      "ext": ".docx",
      "mime_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "size": 10720,
      "upload_timestamp": 1612546194437
    },
    {
      "id": 23,
      "fileName": "template_grant.docx",
      "ext": ".docx",
      "mime_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "size": 10720,
      "upload_timestamp": 1612546204058
    },
    {
      "id": 24,
      "fileName": "template_grant.docx",
      "ext": ".docx",
      "mime_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "size": 10720,
      "upload_timestamp": 1612593771052
    }
  ]
}
```

-- /file/delete/:id [DELETE] - удаляет документ из базы и локального
хранилища

Response:

```json
{
  "status": "deleted"
}
```

-- /file/:id [GET] - вывод информации о выбранном файле;

Response:

```json
{
  "fileName": "template_grant.docx",
  "ext": ".docx",
  "mime_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "size": 10720,
  "upload_timestamp": 1612546204058
}
```

-- /file/download/:id [GET] - скачивание конкретного файла;

-- /file/update/:id [PUT] - обновление текущего документа на новый в базе и
локальном хранилище;

Request:

```json
{
  "file": "file"
}
```

Response:

```json
{
  "status": true,
  "message": "File is updated",
  "data": {
    "name": "template_grant.docx",
    "extension": ".docx",
    "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "size": 10720,
    "uploadTimestamp": 1612594075118
  }
}
```

- /info [GET] - возвращает id пользователя;

```json
{
  "userId": "user"
}
```

-- /logout [GET] - выйти из системы;

```json
{
  "status": "LOGOUT"
}
```

-- /latency [GET] - пинг заданного ресурса (vk.com);

## Usage

```javascript
nodemon #dev
node index #prod
```
