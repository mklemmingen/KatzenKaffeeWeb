"use client";

import React from 'react';
import "./_styles/playAround.css";
import Image from 'next/image';

function Page() {

    return (
        <div>
            <div className="cats">
                <div className="cat cat--1">
                    <Image src="https://cdn.dribbble.com/users/218750/screenshots/2090988/sleeping_beauty.gif" alt=""/>
                </div>
                <div className="cat cat--2">
                    <Image src="https://cdn.dribbble.com/users/6191/screenshots/1192777/catpurr.gif" alt=""></Image>
                </div>
                <div className="cat cat--3">
                    <Image src="https://cdn.dribbble.com/users/6191/screenshots/2211315/meal.gif" alt=""></Image>
                </div>
                <div className="cat cat--4">
                    <Image src="https://cdn.dribbble.com/users/6191/screenshots/1189704/walkingcat.gif" alt=""></Image>
                </div>
                <div className="cat cat--5">
                    <Image src="https://cdn.dribbble.com/users/6191/screenshots/3661586/cat_sleep_dribbble.gif" alt=""></Image>
                </div>
            </div>
        </div>
    );
}

export default Page;

