export default function Copyright() {

    function getCurrentYear(): any {
        let currentYear = new Date().getFullYear();
        if (currentYear === 2025) {
            return (<footer>Copyright Celeste Burel {currentYear}</footer>);
        }
        return (<footer>Copyright Celeste Burel 2025 - {currentYear}</footer>);
    }

    return (
        getCurrentYear()
    );
}