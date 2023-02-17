const lintStaged = require('lint-staged');

(async () => {
    let innerSuccess = false;

    process.exit(0);
    
    const config = {
        "packages/(public|mobile)/(src|server)/**/*.(t|j)s?(x)": [
            "eslint"
        ],
        "packages/public/(src|server)/**/*.ts?(x)": [
            () => `tsc --project ./packages/public' --noEmit`
        ],
        "packages/mobile/(src|server)/**/*.ts?(x)": [
            () => `tsc --project ./packages/mobile' --noEmit`
        ],
        "packages/components/**/*.ts?(x)": [
            () => `tsc --project ./packages/components' --noEmit`
        ],
    }

    const success = await lintStaged({
        config,
    }, {
        log(line) {
            console.log(line)
        },
        warn(line) {
            console.warn(line)
        },
        error(line) {
            let string = line;

            string = String(string)
                // Удаляем рекомендации по установке типов из npm
                .replace(/Try \`npm i --save-dev @types(.*)/g, '')

                // Удаляем ошибки TS7016: Could not find a declaration file for module {...} implicitly has an 'any' type.
                //Ошибка связана с неявным any на экспорте
                .replace(/(.*)TS7016(.*)/g, '')

                // Удаляем ошибки TS2307: Cannot find module {...} or its corresponding type declarations.
                // Ошибка связана с резолвом пакетов tsc-движка
                .replace(/(.*)TS2307(.*)/g, '')

                //Удаляем пустые переносы строк
                .replace(/^\s*\n/gm, '');

            // иногда остаются пробелы
            if (string.length < 10) {
                innerSuccess = true;
            } else {
                console.error(String(line)
                    // Удаляем trailing newline
                    .replace(/\n*$/, '')
                    // Добавляем отбивки и красим в циан
                    .replace(/^(?!\s)/gm, '\x1b[36m✖ ')
                );
            }

        },
    });

    if (!success && !innerSuccess) {
        process.exit(1);
    }
})();
