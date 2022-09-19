import express from 'express';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return response.json(games);
})

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;


    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),  
            hourStat: convertHourStringToMinutes(body.hourStat),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            yearsPlaying: true,
            hourStat: true,
            hourEnd: true,
            useVoiceChannel: true,
            discord: true,
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createAt: 'desc',
        }
    })

    response.json(ads.map((ad)=>{
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStat: convertMinutesToHourString(ad.hourStat),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where: {
            id: adId
        }
    })
    
    response.json({
        discord: ad.discord
    });
})

app.get('/games/:id', async (request, response) => {
    const gameId = request.params.id;

    const game = await prisma.game.findUniqueOrThrow({
        select:{
            title: true,
            bannerUrl: true,
            _count: true,
        },
        where:{
            id: gameId
        }
    })

    response.json(game);
})

app.listen(3333);

console.log("Hello, world!");