interface HSStaticMethods {
    autoInit: () => void;
}

interface Window {
    HSStaticMethods: HSStaticMethods;
}