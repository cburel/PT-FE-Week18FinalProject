// copyright component - renders copyright footer
export default function Copyright() {


    // fetches the current year and renders year text based on whether the current year is the same as the year of publication
    function getCurrentYear(): any {
        let currentYear = new Date().getFullYear();
        if (currentYear === 2025) {
            return (<footer>Copyright Celeste Burel {currentYear}</footer>);
        }
        return (<footer>Copyright Celeste Burel 2025 - {currentYear}</footer>);
    }

    return (
        <div className="footer-display">
            {getCurrentYear()}
        </div>
    );
}