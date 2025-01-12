import 'dotenv/config';

import ora from 'ora';
import gradient from 'gradient-string';
import figlet from 'figlet';

import { BotBlazeWithTelegram } from '../src/index.mjs'
import { _getColorNameOrEmoticon } from '../src/util/blaze.mjs';

figlet('Blaze with Telegram', (_, screen) => {
    console.log(gradient.vice(screen));
    console.log('       ' + gradient.cristal('by: Elizandro Dantas fk:Sm1g00l'));
    console.log();
    start();
});

async function start(){
    let appOra = ora('Iniciando aplicação').start(),
        controllerBot = new BotBlazeWithTelegram({
            timeAfterWin: {
                message: "Tempo para analise apos win",
                time: 1
            },
            sticker: {
                win: "win.jpg",
                winGale: "win-in-gale.jpg",
                winWhite: "win-white.jpg",
                loss: "loss.jpg",
            },
            timeAfterLoss: {
                time: 5,
                message: "Tempo para analise apos loss"
            },
            summaryOfResult: {
                interval: 1,
                message: (number) => {
                    return `Total de jogadas: ${number.total}` +
                        `\nWins seguidos: ${number.consecutive} ✅` +
                        `\nTotal de win: ${number.win} ✅` +
                        `\nTotal de loss: ${number.loss} ❌` +
                        `\nTaxa de acertividade: ${(number.win / number.total * 100).toFixed(1)}%`
                }
            },
            messageEnterBet: (current, recents, cb) => {
                // cb('test callback');
        
                return "🔎 <b>SINAL ENCONTRADO:</b>\n" +
                    `\nENTRE NO ${_getColorNameOrEmoticon(0, { emoticon: true })} ${_getColorNameOrEmoticon(0, { pt: true, upper: true })}\n` +
                    `\n5 ENTRADAS COM O MESMO VALOR` +
                    `\n\n<pre>https://blaze.com/</pre>`;
            },
            gale: 4,
            analysis: [
                {
                    entryColor: "white",
                    search: [
                        { color: "white" },
                    ]
                }
            ]
         })

    await controllerBot.run();

    appOra.succeed('Iniciado com sucesso!');

    process.on('SIGINT', () => {
        controllerBot.telegram.close();
        controllerBot.blaze.socket.closeSocket();
        process.exit();
    });
    process.on('SIGQUIT', () => {
        controllerBot.telegram.close();
        controllerBot.blaze.socket.closeSocket();
        process.exit();
    });
    process.on('SIGTERM', () => {
        controllerBot.telegram.close();
        controllerBot.blaze.socket.closeSocket();
        process.exit();
    });
}