# Mess Management Application

This is a React Native application designed for mess management, featuring separate interfaces for **Admin** and **User** panels. The app allows admins to manage the menu by creating, updating, and deleting items, while users can browse and place orders. Access control ensures that users cannot access admin functionalities.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Contributing](#contributing)
- [License](#license)

## About the Project

The Mess Management Application streamlines menu management and ordering for mess facilities. It offers an intuitive admin panel for mess staff to manage products efficiently, and a user panel where customers can place orders from the available items.

## Features

### Admin Panel
- **Product Management**: Add, update, or delete menu items.
- **Order Management**: View and track orders placed by users.
- **Access Control**: Restricted to authorized admin users only.

### User Panel
- **Menu Browsing**: View available items.
- **Order Placement**: Place orders directly from the app.
- **Order Tracking**: Check the status of placed orders.

## Getting Started

To set up and run this project locally, follow the steps below.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 20 or higher recommended)
- **npm** (comes with Node.js)
- **Expo CLI**: Install globally with:

  ```bash
  npm install -g expo-cli
  ```

- **Expo Go App** (for Android and iOS): For testing the app on a physical device.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rupesh-dev30/Mess-Management.git
   cd mess-management
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Supabase**
  This project uses Supabase for backend data manipulation. Follow these steps:

  - Create a Supabase project at Supabase.
  - Copy your Supabase Project URL and anon key.
  - Create a .env file in the root directory (refer to .env.example)
  
  ```bash
  EXPO_PUBLIC_SUPABASE_URL=<Your Supabase URL>
  EXPO_PUBLIC_SUPABASE_ANON=<Your Supabase anon key>
  ```
### Running the App

Start the project with Expo by running:

```bash
npm start
```

This command opens the Expo development server. You can then scan the QR code with the Expo Go app on your phone to view the app. Alternatively, use the following commands to open the app in an emulator:

- **iOS Simulator**: `npm run ios`
- **Android Emulator**: `npm run android`

> **Note**: For iOS/Android emulator setup, refer to [React Native’s environment setup guide](https://reactnative.dev/docs/environment-setup).


## Contributing

Contributions are welcome! If you have improvements or ideas, feel free to fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add Your Feature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
