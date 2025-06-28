export default function Copyright() {

    function getCurrentYear(): any {
        let currentYear = new Date().getFullYear();
        if (currentYear === 2025) {
            return (<div>Copyright Celeste Burel {currentYear}</div>);
        }
        return (<div>Copyright Celeste Burel 2025 - {currentYear}</div>);
    }

    return (
        getCurrentYear()
    );
}