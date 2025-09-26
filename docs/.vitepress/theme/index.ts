import DefaultTheme from "vitepress/theme";
import VersionDisplay from "../components/VersionDisplay.vue";
import VersionFilename from "../components/VersionFilename.vue";
import "./style.css";

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component("VersionDisplay", VersionDisplay);
        app.component("VersionFilename", VersionFilename);
    }
};
