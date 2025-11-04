# Safari Adventures Kenya

A modern, responsive travel website for exploring Kenya's breathtaking destinations, luxury hotels, and curated travel packages. Built with React and powered by Supabase for seamless booking experiences.

## 🌟 Features

- **Home Page**: Engaging hero section, about us, top destinations showcase, hotel listings, and newsletter subscription
- **Hotel Bookings**: Browse and book luxury hotels across Kenya with real-time availability
- **Travel Packages**: Discover curated tour packages with detailed itineraries and pricing
- **Admin Dashboard**: Secure admin panel for managing hotels, packages, and viewing bookings
- **Responsive Design**: Optimized for all devices with Tailwind CSS
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Real-time Database**: Powered by Supabase for instant data synchronization

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Build Tool**: Create React App
- **Testing**: React Testing Library, Jest

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd safari-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
safari-client/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── BookingModal.jsx
│   │   ├── Destinations.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── HomePage.jsx
│   │   ├── Hotels.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Packages.jsx
│   │   └── Subscribe.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HotelsPage.jsx
│   │   ├── PackagesPage.jsx
│   │   └── SubscribePage.jsx
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── supabaseClient.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🗄️ Database Schema

The application uses Supabase with the following main tables:

- **hotels**: Hotel listings with name, location, price, image, description
- **packages**: Travel packages with details, pricing, duration
- **bookings**: Hotel booking records
- **package_bookings**: Package booking records
- **subscribers**: Newsletter subscribers

## 🔧 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you eject, you can't go back!**

##  Features Overview

### Home Page
- Hero section with call-to-action
- About Safari Adventures
- Top tourist destinations (Maasai Mara, Diani Beach, Mount Kenya, Lake Nakuru)
- Featured hotels
- Newsletter subscription

### Hotels Page
- Browse available hotels
- Book hotels with date selection
- Real-time availability

### Packages Page
- Explore travel packages
- Book packages with custom dates
- Detailed package information

### Admin Dashboard
- Add/manage hotels
- View all bookings
- Secure login required

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License.

##  Contact

For questions or support, please reach out to the development team.

---

**Discover Kenya Like Never Before** 🦁
