'use client'
import React, { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import myVoice from '../../../data/myVoices'
import { Select, SelectContent, SelectLabel, SelectValue } from '@/components/ui/select'
import { SelectGroup, SelectItem, SelectTrigger } from '@radix-ui/react-select'
import Audiofile from './audiofile'
import useStore from './store' 

const Audiobox = () => {
    const { text, setText } = useStore();

    const [volume, setVolume] = useState([1.0])
    const [rate, setRate] = useState([1.0])

    const [progress, setProgress] = useState<number>(0);

    const [isDownload, setIsDownload] = useState(false)
    const [lang, setLang] = useState("en")
    const [tld, setTld] = useState("co.in")
    const [voiceName, setVoiceName] = useState("");
    const [audioDuration, setAudioDuration] = useState<number>(0)
    const [file_name, setFile_name] = useState("output.mp3")

    // let text = "tingalinga lingalinga tingalinga lingalinga"

    let user = { text, lang, tld, volume, rate, isDownload, file_name }

    const handleSelectChange = (value: string) => {
        const data = JSON.parse(value)
        setVoiceName(data.value);
        setLang(data.lang)
        setTld(data.tld)
    };

    const updateFileName = (name: string) => {
        setFile_name(name + '.mp3')
    }

    const handleAudioObject = (audio: HTMLAudioElement) => {
        audio.onloadedmetadata = () => {
            setAudioDuration(audio.duration);
        };
        // console.log(audio)

        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                setProgress(progress);
            }
        };
    };

    const formatDuration = (durationInSeconds: number) => {
        if (durationInSeconds === 0 || isNaN(durationInSeconds)) {
            return "00:00"
        }
        const seconds = Math.floor(durationInSeconds);
        const milliseconds = Math.floor((durationInSeconds - seconds) * 1000);
        const twoDigitMilliseconds = milliseconds.toString().padStart(2, '0').slice(0, 2);
        const twoDigitSeconds = seconds.toString().padStart(2, '0');

        return `${twoDigitSeconds}:${twoDigitMilliseconds}`;
    };

    return (
        <div className='flex flex-col justify-center items-center gap-2 w-full h-full'>
            <div className='flex flex-col w-full'>
                <div className='flex flex-col border-slate-200 pt-1 pb-2 border-b-2 w-full'>
                    <div className='flex flex-col gap-1 px-4'>
                        <div className='flex'>Volume</div>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <Slider onValueChange={(i) => setVolume(i)} defaultValue={volume} max={1.0} step={0.1} />
                            <div className='flex justify-center items-center text-sm'>
                                {volume}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col border-slate-200 pt-2 pb-2 border-b-2 w-full'>
                    <div className='flex flex-col gap-2 px-4'>
                        <div className='flex'>Rate</div>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <Slider onValueChange={(i) => setRate(i)} defaultValue={rate} max={2} step={0.2} />
                            <div className='flex justify-center items-center text-sm'>
                                {rate}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center border-slate-200 py-2 border-b-2'>
                    <div className='flex px-4 py-2 w-full h-10'>
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className='flex justify-center items-center border-2 py-3 border-black rounded-md w-full'>
                                <SelectValue placeholder="English (India)">
                                    {voiceName ? voiceName : "English (India)"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        Voices
                                    </SelectLabel>
                                    {myVoice.map((voices, ind) => (
                                        <SelectItem className='px-2' value={JSON.stringify(voices)} key={ind}>{voices.value}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center gap-2 my-4 w-56 h-18'>
                <Audiofile to_play={true} imageSrc="/image/audio.png" user={user} onAudioCreated={handleAudioObject} />
                <Progress value={progress} />
                <div className='flex justify-center items-center text-sm'>
                    {formatDuration(audioDuration)}
                </div>
            </div>
            <div className='flex justify-center items-center gap-2 pb-2'>
                <div className='flex justify-center items-center font-mono text-md'>Download Audio</div>
                <Switch checked={isDownload} onCheckedChange={setIsDownload} />
                <div className='hover:scale-150 flex justify-center items-center border-2 ml-2'>
                    <Audiofile to_play={false} imageSrc="/image/download.png" user={user} onAudioCreated={handleAudioObject} />
                </div>
            </div>
            <div className='flex justify-center items-center mb-3 px-4 w-full'>
                <input className='border-2 border-slate-200 px-2 rounded-md w-full' type="text" name="file_name" id="file_name" onChange={(e) => updateFileName(e.target.value)} placeholder='Enter file name:' />
            </div>
        </div>
    )
}

export default Audiobox