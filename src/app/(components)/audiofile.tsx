'use  client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
    user: {
        text: string;
        lang: string;
        tld: string,
        volume: number[];
        rate: number[];
        isDownload: boolean;
        file_name: string;
    };
    onAudioCreated: (audio: HTMLAudioElement) => void;
    imageSrc: string;
    to_play: boolean;
}

const Audiofile = ({ user, onAudioCreated, imageSrc, to_play }: Props) => {

    const handleSpeak = async () => {
        try {
            // let url = "http://127.0.0.1:5000/back"
            let url = "https://ttsx3.onrender.com/back"

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            };

            let res = await fetch(url, options)

            if (res.ok) {
                let blob = await res.blob()
                console.log(blob)
                const data = window.URL.createObjectURL(blob)
                const audio = new Audio(data);
                audio.playbackRate = user.rate[0]
                audio.volume = user.volume[0]
                if (to_play) {
                    audio.play();
                }

                onAudioCreated(audio);

                if (user.isDownload && !to_play) {
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = data;
                    a.download = user.file_name;
                    document.body.appendChild(a);
                    a.click();
                }
                if (user.isDownload == false && to_play == false) {
                    alert("Please switch Download Audio On")
                }
                audio.onended = () => {
                    window.URL.revokeObjectURL(data);
                };
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <button onClick={() => handleSpeak()}>
                <Image src={imageSrc} alt='audio' width={22} height={22} />
            </button>
        </div>
    )
}

export default Audiofile