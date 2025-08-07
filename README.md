# Weather Dashboard

A comprehensive, modern weather dashboard built with React and TypeScript, featuring real-time weather data, interactive forecasts, and beautiful UI design.

## 🌟 Features

### Core Weather Information
- **Current temperature** with feels-like temperature
- **Weather conditions** with animated icons
- **Location detection** with manual search
- **Real-time updates** with current time and date
- **Weather animations** representing current conditions

### Hourly Forecast (Next 24 Hours)
- **Temperature trends** for each hour
- **Precipitation chances** with visual indicators
- **Wind speed and direction** with arrows
- **Condition icons** for quick visual reference

### Daily Forecast (7 Days)
- **High/low temperatures** with clear display
- **Weather summaries** with detailed descriptions
- **Wind and precipitation** probability
- **UV index** and environmental data

### Environmental Data
- **Humidity levels** with comfort indicators
- **Wind speed and gusts** with direction arrows
- **UV index** with risk level warnings
- **Visibility** in multiple units
- **Barometric pressure** with trend indicators
- **Air quality index** with color coding

### Interactive Features
- **Location search** with autocomplete
- **Unit toggles** (°C/°F, km/h/mph, mb/in)
- **Theme switching** (Light/Dark mode)
- **Favorite locations** with quick switching
- **Responsive design** for all devices

### Severe Weather Alerts
- **Real-time alerts** with severity levels
- **Visual warnings** with color coding
- **Detailed information** with instructions
- **Geographic targeting** for affected areas

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tariel1007/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API key** (Optional)
   - Sign up for a free API key at [WeatherAPI.com](https://www.weatherapi.com/)
   - Create a `.env` file in the root directory
   - Add your API key: `REACT_APP_WEATHER_API_KEY=your_api_key_here`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **WeatherAPI.com** - Real-time weather data
- **date-fns** - Date formatting utilities
- **Framer Motion** - Smooth animations
- **React Icons** - Beautiful icon library

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎨 Design Features

- **Glass morphism** effects with backdrop blur
- **Smooth animations** and transitions
- **Dark/Light theme** support
- **Modern gradient** backgrounds
- **Interactive hover** effects
- **Accessible** color schemes

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_WEATHER_API_KEY=your_weather_api_key_here
```

### Customization
- Modify `src/index.css` for theme colors
- Update `src/utils/weatherUtils.ts` for unit conversions
- Customize components in `src/components/`

## 📊 Data Sources

- **WeatherAPI.com** - Primary weather data source
- **Geolocation API** - Automatic location detection
- **Mock data** - Fallback for development

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for providing weather data
- [React](https://reactjs.org/) team for the amazing framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [date-fns](https://date-fns.org/) for date utilities

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Built with ❤️ using React and TypeScript** 