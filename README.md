# Locatory - Your Directory For Places
Locatory is a mobile app that allows you to discover and save places near you and is available in 6 languages (English, Mandarin, Hindi, French, Arabic, Russian)
##### Demo video - TBU 
##### Download Locatory from [here](https://bit.ly/locatory-apk)
#### Table of contents (with TTR)
##### 1. Setup and Usage
##### 2. Tech Summary (4 min 30 secs)
##### 3. Business (49 secs)
### Setup and Usage:
#### Frontend
``` 
1. cd locatory
2. Update API_URL in locatory/src/utils/constants.ts
3. npm install
4. npm start
```
#### Backend
```
1. cd locatory-server
2. Create a Database in AstraDB and execute the queries (one by one) from locatory-server/src/schema.cql in your preferred keyspace
3. Update the .env file
4. npm install
5. npm start
```
### Tech Summary:
#### 🗄️ Database
The user table stores the user's phone number as well as the ids of their favourite places. The partition key for this table is the column 'phone number' with the data type TEXT, and there is no clustering key for this table, which acts as a key-value pair. The location identifiers are saved in the 'favourites' column, which contains a SET of TEXT.

![](https://github.com/jarusYajiv67/locatory/blob/main/db.PNG)

The Tokens table stores each user's access token (JWT token). The partition key is the 'phone number' column with the data type TEXT, and the JWT token is stored in the 'tkn' column with the data type TEXT.

#### 🚀 Backend
The backend of Locatory is written in JavaScript and NodeJS. The ExpressJs framework enabled handling requests from client side. Custom middleware was written to verify users using the JSON Web Token package. The Cassandra driver was used to communicate with Astra DB from the server. Morgan came in handy when it came to logging the details of the incoming requests.

#### ✨ Frontend
The frontend of Locatory is written in TypeScript and uses React Native (Expo managed). To avoid overlapping styles when bundling, styled-components were used for styling. Instead of the built-in fetch api, axios is used to make api calls. In order to avoid boilerplate code when using redux, the app's state is managed with the help of react context. However, when the time comes, state management will be switched to redux so that new data can be easily managed. To access the respective translated sentence from the src/utils/translations.ts file, a state for the current language that is being used (defaults to english) is used.

#### 💰 Business
Advertisements and user subscriptions are the primary sources of revenue for Locatory. The advertisements are geo-targeted and appear when an API call is processed. Advertisers select their desired location and the length of time they wish to display the specified advertisement. For example, Advertiser A pays Locatory to display advertisements on City C from K to L. Thus, users (with free subscriptions) in City C will see advertisements from Advertiser A between the hours of K and L. The cost of advertising varies depending on the season and location. If two advertisers want to advertise at the same time and location, the one with the highest bid wins. Another option is to sign up for a user subscription, which is available on a monthly and yearly basis. If a user's subscription has expired, they will be unable to use the app.
