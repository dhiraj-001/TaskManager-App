# TaskManager

A modern, user-friendly task management app built with React Native. TaskManager helps you organize your tasks efficiently with a beautiful UI and smooth user experience.

## Features

- **Task Management**: Add, delete, and mark tasks as completed.
- **Persistent Storage**: Tasks are saved locally using AsyncStorage, so they remain even after closing the app.
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing.
- **Responsive UI**: Clean and intuitive interface with smooth animations.
- **Cross-Platform**: Works on both Android and iOS.

## Screenshots

(Add screenshots of your app here)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/TaskManager.git
   cd TaskManager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install AsyncStorage** (if not already installed):
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

4. **Run the app**:
   - For Android:
     ```bash
     npm run android
     ```
   - For iOS:
     ```bash
     npm run ios
     ```

## Usage

- **Home Screen**: View all your tasks. If no tasks are added, you'll see a prompt to add one.
- **Add Task Screen**: Create new tasks with a title and description.
- **Task Card**: Click on a task to view its details. Mark tasks as completed or delete them.

## Building the APK

To generate a release APK for Android:

1. **Generate a keystore** (if you haven't already):
   ```bash
   keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Move the keystore** to `android/app/my-release-key.keystore`.

3. **Configure the keystore** in `android/gradle.properties`:
   ```
   MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
   MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
   MYAPP_UPLOAD_STORE_PASSWORD=your-store-password
   MYAPP_UPLOAD_KEY_PASSWORD=your-key-password
   ```

4. **Build the APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

5. **Find the APK** at `android/app/build/outputs/apk/release/app-release.apk`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
