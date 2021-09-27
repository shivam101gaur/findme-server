
# FIND ME SERVER

This server code serves all the back-end services for  
[**FIND-ME**](https://find-me0.web.app) 
App running on Google Cloud App Engine.

![App Screenshot](src/assets/screen-shots/serverstarted.png)

  

## Technolgy Used

**Client:** [Angular](https://angular.io/), [Ionic](https://ionicframework.com/docs/angular/overview) ,  [Socket.io Client-side](https://socket.io/docs/v4/client-api/)

**Server:** [TypeScript](https://www.typescriptlang.org/), [ Node.js](https://nodejs.org/en/docs/), [Express](https://www.npmjs.com/package/express) ,[ Socket.io Server-side](https://socket.io/docs/v4/server-api/)

  
## Deployment
 To deploy this project run
 
```bash
  nodemon
```

To deploy this project run

```bash
  npm run deploy
```

  
## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

  
## Developers

[@shivam101gaur](https://www.github.com/shivam101gaur)

  