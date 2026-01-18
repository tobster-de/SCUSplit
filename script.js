function app() {
    return {
        zahl: '',
        maxSize: 16,
        summe: '',
        ergebnis: '',
        isError: false,
        lang: 'en',
        translations: {
            de: {
                title: "Cargo-Aufteilung",
                header: "Cargo aufteilen",
                labelZahl: "Anzahl SCUs",
                labelMax: "Max. Container-Größe",
                button: "Aufteilen",
                error: "Bitte geben Sie gültige positive Zahlen ein.",
            },
            en: {
                title: "Cargo Splitting",
                header: "Split Cargo",
                labelZahl: "Number of SCUs",
                labelMax: "Max. Container Size",
                button: "Split",
                error: "Please enter valid positive numbers.",
            }
        },
        init() {
            this.lang = navigator.language.startsWith('de') ? 'de' : 'en';
            document.documentElement.lang = this.lang;
            document.title = this.translations[this.lang].title;
        },
        calculateSplit() {
            const zahl = parseInt(this.zahl);
            const maxSize = parseInt(this.maxSize);
            if (isNaN(zahl) || zahl < 0 || isNaN(maxSize) || maxSize < 0) {
                this.isError = true;
                this.summe = '';
                this.ergebnis = this.translations[this.lang].error;
                return;
            }
            let rest = zahl;
            let ergebnis = '';
            let potenz = maxSize;
            let teile = [];
            while (rest > 0 && potenz >= 1) {
                const anzahl = Math.floor(rest / potenz);
                if (anzahl > 0) {
                    teile.push(potenz + ' * ' + anzahl);
                    const wert = anzahl * potenz;
                    rest -= wert;
                }
                potenz /= 2;
            }
            ergebnis += teile.join('\n');
            if (rest > 0) {
                ergebnis += '\n(Rest: ' + rest + ')';
            }
            this.isError = false;
            this.summe = zahl;
            this.ergebnis = ergebnis;
        }
    }
}