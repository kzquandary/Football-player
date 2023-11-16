import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import playersData from "../source.json";
import "../app/globals.css";
import Head from 'next/head';

interface Player {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  city: string;
  country: string;
  position: string;
  avatar: string;
}

interface HomeProps {
  players: Player[];
}


export default function Home({ players }: HomeProps) {
  //Menggunakan useState untuk melakukan pergantian filter posisi
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const filteredPlayers = selectedPosition
    ? players.filter((player) => player.position === selectedPosition)
    : players;

  return (
    <div className="">
      <Head>
        <title>Football Player List</title>
        <meta name="description" content="Football Player List" />
      </Head>
      <h2>Football Player List</h2>
      <div className="mb-4">
        <label htmlFor="positionDropdown" className="mr-2">
          Positions:
        </label>
        <select
          className=" border-4 border-black-500"
          style={{ textTransform: "capitalize" }}
          id="positionDropdown"
          onChange={(e) => setSelectedPosition(e.target.value)}
          value={selectedPosition || ""}
        >
          <option value="">All Positions</option>
          {Array.from(new Set(players.map((player) => player.position))).map(
            (position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            )
          )}
        </select>
      </div>
      <div className="flex flex-wrap">
        {filteredPlayers.map((player, index) => (
          // Link untuk mendapatkan detail setiap player
          <Link key={index} href={`/player/${player.username}`}>
            <div className="card bg-white flex items-center p-4 shadow-lg rounded-2xl w-80 h-60 m-4">
              <div className="profile mx-auto rounded-full mr-4">
                <Image
                  src={player.avatar}
                  alt={`${player.firstName} ${player.lastName}`}
                  width={108}
                  height={108}
                  className="rectangle-icon rounded-lg"
                />
              </div>
              <div className="text-left flex-grow">
                <h2 className="text-lg font-semibold">
                  {player.firstName} {player.lastName}
                </h2>
                <p
                  className="text-gray-600"
                  style={{ textTransform: "capitalize" }}
                >
                  {player.position}
                </p>
                <div className="mt-2">
                  <p className="text-gray-700">City : {player.city}</p>
                  <p className="text-gray-700">Country : {player.country}</p>
                  <p className="text-gray-700">Phone : {player.phoneNumber}</p>
                  <p className="text-gray-700">Email : {player.email}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
    // Mengambil data dari file source.json 
    const playersWithUsername = playersData.map((player) => ({
      ...player,
      username: player.username.toLowerCase(),
    }));
  
    return {
      // Key 'props' berisi objek dengan properti yang akan tersedia sebagai props di komponen Home.
      // Return prop dengan objek username yang akan digunakan untuk unique identity 
      props: {
        players: playersWithUsername,
      },
    };
  }
  
