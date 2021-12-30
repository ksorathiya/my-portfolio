import Head from "next/head";
import Image from "next/image";
import { generateRSS } from "../rssUtil";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTimeoutFn } from "react-use";

// import { Markdown } from "../components/Markdown";
// import { PostData, loadBlogPosts, loadMarkdownFile } from "../loader";
import { loadBlogPosts, loadMarkdownFile } from "../loader";
// import { PostCard } from "../components/PostCard";
import useSWR from "swr";

const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data: currently_playing_data } = useSWR(
    "/api/spotify-now-playing",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );
  const { data: random_quote_data, mutate: random_quote_mutate } = useSWR(
    "/api/random-quote",
    fetcher
  );

  const { data: recently_played_data } = useSWR(
    "/api/spotify-recently-played",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  let randInt = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let [isShowing, setIsShowing] = useState(true);
  let [rgb, shuffleRGB] = useState(
    "rgb(" +
      randInt(0, 128) +
      ", " +
      randInt(0, 128) +
      ", " +
      randInt(0, 128) +
      ")"
  );

  let [, , resetIsShowing] = useTimeoutFn(() => {
    setIsShowing(true);
    random_quote_mutate();
    shuffleRGB(
      "rgb(" +
        randInt(0, 128) +
        ", " +
        randInt(0, 128) +
        ", " +
        randInt(0, 128) +
        ")"
    );
  }, 500);
  return (
    <div className="antialiased bg-body text-body font-body">
      <Head>
        <title>Introducing Kartik</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <section>
          <div className="container mx-auto px-4 max-w-screen-xl">
            <nav className="px-10 py-8 bg-transparent">
              <div className="flex justify-between items-center">
                <a className="text-gray-600 text-2xl leading-none" href="#">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="inline align-middle w-10"
                  >
                    <path
                      d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3V3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z"
                      fill="#0D0E10"
                    ></path>
                  </svg> */}
                  <h6 className="inline text-sm md:text-lg">
                    Hi 👋 by <b>Kartik Sorathiya</b>
                  </h6>
                </a>
                <div className="lg:hidden">
                  {/* <button className="block navbar-burger text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="h-4 w-4" fill="currentColor " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"/>
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button> */}
                </div>
                {/* <ul className="hidden lg:flex ml-auto mr-10 items-center w-auto space-x-12">
            <li><a className="text-sm text-gray-500 hover:text-gray-700" href="#">About</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-700" href="#">Company</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-700" href="#">Services</a></li>
            <li><a className="text-sm text-gray-500 hover:text-gray-700" href="#">Testimonials</a></li>
          </ul> */}
                <a
                  className="hidden lg:block md:block px-6 py-3 text-sm text-white font-bold border border-gray-100 hover:border-gray-200 rounded-3xl bg-black"
                  href="https://docs.google.com/document/d/1T7Xl2qQHVSGoRYwqaGK23bnGhYISsMAO/edit?usp=sharing&amp;ouid=113641347303871215868&amp;rtpof=true&amp;sd=true"
                  target="_blank"
                >
                  RESUME
                </a>
              </div>
              <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50">
                <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
                  <div className="flex items-center mb-8">
                    <a
                      className="mr-auto text-2xl font-semibold leading-none"
                      href="#"
                    >
                      <img
                        className="h-8"
                        src="mockup-assets/logos/shuffle-ux.svg"
                        alt=""
                        width="auto"
                      />
                    </a>
                    {/* <button className="navbar-close">
                <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button> */}
                  </div>
                  <div>
                    {/* <ul>
                <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">About</a></li>
                <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Company</a></li>
                <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Services</a></li>
                <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Testimonials</a></li>
              </ul> */}
                  </div>
                  <div className="mt-auto">
                    <div className="pt-6">
                      <a
                        className="block px-6 py-2 mb-3 text-sm text-center text-gray-500 hover:text-gray-600 font-bold leading-loose border border-gray-100 hover:border-gray-200 rounded"
                        href="#"
                      >
                        Sign In
                      </a>
                      <a
                        className="block px-6 py-2 mb-2 text-sm text-center text-gray-500 hover:text-gray-600 font-bold leading-loose border border-gray-100 hover:border-gray-200 rounded"
                        href="#"
                      >
                        Resume
                      </a>
                    </div>
                    <p className="mt-6 mb-4 text-sm text-center text-gray-400">
                      <span>© 2021 All rights reserved.</span>
                    </p>
                  </div>
                </nav>
              </div>
            </nav>
          </div>
        </section>

        <section className="">
          <div className="container px-4 mx-auto max-w-screen-xl">
            <div className="relative pt-12 md:pt-16">
              <div className="max-w-2xl mb-16 mx-auto text-center">
                <div
                  style={{
                    width: "160px",
                    height: "160px",
                    backgroundColor: "rgba(234.08, 248.57, 249.69, 1)",
                    borderRadius: "9999px",
                  }}
                  className="mx-auto mb-8"
                >
                  <img
                    style={{ position: "relative", top: "5px", left: "-2px" }}
                    src="mockup-assets/images/my-photo.png"
                    alt=""
                  />
                </div>
                <h3 className="mb-8 text-2xl lg:text-3xl font-heading font-medium mb-12">
                  Hi, I’m Kartik 🤘
                </h3>
                <h2 className="text-4xl lg:text-5xl font-heading font-medium">
                  I understand what you want, build what you need, and deliver
                  what you deserve.
                </h2>
                <div className="mb-12 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="298"
                    height="32"
                    viewBox="0 0 298 32"
                    fill="none"
                    className="m-auto mb-8"
                  >
                    <path
                      d="M1 17.1944C62.6418 7.28318 174.478 -8.49028 296 27"
                      stroke="#D0EAEC"
                      strokeWidth="9"
                    ></path>
                  </svg>
                </div>
                <p className="mb-8 text-xl mt-8 mb-12">
                  I am an architect of innovative and intuitive solutions which
                  helps bring your vision to reality at{" "}
                  <a
                    target="_blank"
                    href="https://solvative.com"
                    className="text-blue-900"
                  >
                    Solvative
                  </a>
                  .{" "}
                </p>

                {/* <!--I  carve your vision into reality with intuitive functionalities , resilient  systems and feasible products.--> */}
                <div className="">
                  <a
                    className="inline-block w-full lg:w-auto py-3 px-6 font-bold border rounded bg-black text-white rounded-3xl text-sm"
                    href="mailto:sorathiyakartik@gmail.com"
                    target="_blank"
                  >
                    CONNECT WITH ME
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50">
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav className="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                <a
                  className="mr-auto text-2xl font-semibold leading-none"
                  href="#"
                >
                  <img
                    className="h-8"
                    src="mockup-assets/logos/shuffle-ux.svg"
                    alt=""
                    width="auto"
                  />
                </a>
                <button className="navbar-close">
                  <svg
                    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                <ul>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded"
                      href="#"
                    >
                      About
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded"
                      href="#"
                    >
                      Company
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded"
                      href="#"
                    >
                      Services
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded"
                      href="#"
                    >
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <p className="mt-6 mb-4 text-sm text-center text-gray-400">
                  <span>© 2021 All rights reserved.</span>
                </p>
              </div>
            </nav>
          </div>
        </section>

        <section className="py-20">
          <div className="container lg:px-32 px-5 mx-auto max-w-screen-xl">
            <div className="flex flex-wrap content-start	 -mx-4">
              <div className="w-full lg:w-1/2 md:w-1/2 px-4 mb-5">
                <div className="lg:max-w-sm">
                  <h2 className="text-3xl mt-3 font-medium font-heading">
                    Work Experience 💻
                  </h2>
                  <svg
                    className="mb-12 "
                    xmlns="http://www.w3.org/2000/svg"
                    width="258"
                    height="14"
                    viewBox="0 0 258 14"
                    fill="none"
                  >
                    <path
                      d="M1 7.54292C54.4925 3.03781 151.543 -4.13195 257 12"
                      stroke="#D0EAEC"
                      stroke-width="4"
                    />
                  </svg>
                  <div className="flex mb-10">
                    <div className="max-w-sm">
                      <h3 className="mb-4 -mt-1 text-xl font-medium font-heading">
                        Solvative
                      </h3>
                      <h6 className="mb-2 text-md">
                        Solution Architect | Tech Lead
                      </h6>
                      <p className="text-gray-500 leading-loose">
                        August 2016 - present
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-10">
                    <div className="max-w-sm">
                      <h3 className="mb-4 -mt-1 text-xl font-medium font-heading">
                        Seneca Hackathon
                      </h3>
                      <h6 className="mb-2 text-md">Director of IT</h6>
                      <p className="text-gray-500 leading-loose">
                        January 2020 - present
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 md:w-1/2 px-4 mb-5">
                <div className="lg:max-w-sm">
                  <h2 className=" text-3xl mt-3 font-medium font-heading">
                    Education 🎓
                  </h2>
                  <svg
                    className="mb-12"
                    xmlns="http://www.w3.org/2000/svg"
                    width="159"
                    height="14"
                    viewBox="0 0 159 14"
                    fill="none"
                  >
                    <path
                      d="M1 7.54292C33.806 3.03781 93.3254 -4.13195 158 12"
                      stroke="#FFE0D7"
                      stroke-width="4"
                    />
                  </svg>
                  <div className="flex mb-10">
                    <div className="max-w-sm">
                      <h3 className="mb-4 -mt-1 text-xl font-medium font-heading">
                        Seneca College
                      </h3>
                      <h6 className="mb-2 text-md">
                        Certification | Project Management in IT
                      </h6>
                      <p className="text-gray-500 leading-loose">2020 - 2021</p>
                    </div>
                  </div>
                  <div className="flex mb-10">
                    <div className="max-w-sm">
                      <h3 className="mb-4 -mt-1 text-xl font-medium font-heading">
                        L.D. College of Engineering
                      </h3>
                      <h6 className="mb-2 text-md">
                        B.E. | Information Technology
                      </h6>
                      <p className="text-gray-500 leading-loose">2012 - 2016</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 md:w-1/2 px-4 mb-5">
                <div className="lg:max-w-sm">
                  <h2 className=" text-3xl mt-3 font-medium font-heading">
                    Skills 🪄
                  </h2>
                  <svg
                    className="mb-12"
                    xmlns="http://www.w3.org/2000/svg"
                    width="84"
                    height="14"
                    viewBox="0 0 84 14"
                    fill="none"
                  >
                    <path
                      d="M1 7.54292C18.1343 3.03781 49.2209 -4.13195 83 12"
                      stroke="#D0EAEC"
                      stroke-width="4"
                    />
                  </svg>
                  <div className="flex mb-10">
                    <div className="w-full">
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Requirement Gathering and Analysis
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Project Management
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Solution Architect
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        System Administration
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        DevOps
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading stickerise ">
                        Full Stack Development
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 md:w-1/2 px-4 mb-5">
                <div className="lg:max-w-sm">
                  <h2 className=" text-3xl mt-3 font-medium font-heading">
                    Certificates 💯
                  </h2>
                  <svg
                    className="mb-12"
                    xmlns="http://www.w3.org/2000/svg"
                    width="159"
                    height="14"
                    viewBox="0 0 159 14"
                    fill="none"
                  >
                    <path
                      d="M1 7.54292C33.806 3.03781 93.3254 -4.13195 158 12"
                      stroke="#FFE0D7"
                      stroke-width="4"
                    />
                  </svg>
                  <div className="flex mb-10">
                    <div className="w-1/3">
                      <a
                        href="https://www.credly.com/badges/50e5c366-bb09-49aa-94d5-e679b06ca67d/public_url"
                        target="_blank"
                      >
                        <Image
                          className="mt-12 lg:mb-10  object-cover inline drop-shadow-lg"
                          src="/mockup-assets/images/aws-certified-solutions-architect-associate.png"
                          width="50px"
                          height="70px"
                          layout="responsive"
                          objectFit="contain"
                        />
                      </a>
                    </div>
                    <div className="w-1/3">
                      <a
                        href="https://www.credly.com/badges/41b40061-70af-4e1f-9986-e8c9ae5a9e2f/public_url"
                        target="_blank"
                      >
                        <Image
                          className="mt-12 lg:mb-10  object-cover inline drop-shadow-lg"
                          src="/mockup-assets/images/aws-certified-cloud-practitioner.png"
                          width="50px"
                          height="70px"
                          layout="responsive"
                          objectFit="contain"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 md:w-full px-4 mb-5">
                <div className="">
                  <h2 className=" text-3xl mt-3 font-medium font-heading">
                    Tools ⚒️ that make me, me !
                  </h2>
                  <svg
                    className="mb-12"
                    xmlns="http://www.w3.org/2000/svg"
                    width="159"
                    height="14"
                    viewBox="0 0 159 14"
                    fill="none"
                  >
                    <path
                      d="M1 7.54292C33.806 3.03781 93.3254 -4.13195 158 12"
                      stroke="#FFE0D7"
                      stroke-width="4"
                    />
                  </svg>
                  <div className="flex mb-10">
                    <div className="w-1/2">
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        NodeJS<span className="dot"></span>SailsJS
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        ReactJS<span className="dot"></span>NextJS
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        HTML<span className="dot"></span>CSS
                        <span className="dot"></span>JS
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        MongoDB<span className="dot"></span>InfluxDB
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Redis<span className="dot"></span>Memcache
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        MySQL<span className="dot"></span>Postgres
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Nginx<span className="dot"></span>Apache
                      </h3>
                    </div>
                    <div className="w-1/2 ml-5">
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Docker <span className="dot"></span> Kubernetes
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Ansible <span className="dot"></span> Teleport
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        AWS <span className="dot"></span> Cloudflare
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Linux Systems <span className="dot"></span> IoT
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Asterisk <span className="dot"></span> eJabberd
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        TICK Stack
                      </h3>
                      <h3 className="mb-6 -mt-1 text-xl font-light font-heading">
                        Jira <span className="dot"></span> Confluence
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 md:w-full px-4 mb-5">
                <Image
                  className="mt-12 lg:mb-10  object-cover"
                  src="/mockup-assets/images/macbook_pro.png"
                  width="100px"
                  height="100px"
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <section id="periodic-table" className="py-20 px-16 hidden md:block">
          <h1>My Periodic Table</h1>
          <h5>How I spend my time.</h5>
          <div className="periodic-table w-full xxxl:w-1/2 xxl:w-2/3 xl:w-full grid grid-cols-9 gap-4 lg:gap-1 md:gap-1">
            <div className="empty-spacer-1"></div>
            <div className="empty-spacer-2"></div>
            <div
              className="periodic-element social-media"
              data-description="I'm only on here to reject invitations 😂"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Li</div>
                <div className="description text-xs font-light">LinkedIn</div>
              </div>
            </div>
            <div
              className="periodic-element social-media"
              data-description="Only so I don't miss out on my friends' milestones 🤷"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Fb</div>
                <div className="description text-xs font-light">Facebook</div>
              </div>
            </div>
            <div
              className="periodic-element just-trying"
              data-description="Looking at amazing Dribbble 🏀 shots and internally die from the amount of talent/skill out there"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Hn</div>
                <div className="description text-xs font-light">
                  Hacker News
                </div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="This is where my day and week starts, planning."
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Ji</div>
                <div className="description text-xs font-light">Jira</div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="Making custom emojis for Slack 💪🏻"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Sl</div>
                <div className="description text-xs font-light">Slack</div>
              </div>
            </div>
            <div
              className="periodic-element fun-stuff"
              data-description="'Wikipedia Wormhole' is a thing. And it is dangerous 🐛"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Nf</div>
                <div className="description text-xs font-light">Netflix</div>
              </div>
            </div>
            <div
              className="periodic-element fun-stuff"
              data-description="Choosing the right playlist. (If my Spotify is working... it's always not working)"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Sp</div>
                <div className="description text-xs font-light">Spotify</div>
              </div>
            </div>
            <a
              className="periodic-element social-media"
              data-description="If you say something witty, it's going on my Twitter 🐦"
              href="https://twitter.com/meowlivia_"
              target="_blank"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Tw</div>
                <div className="description text-xs font-light">Twitter</div>
              </div>
            </a>
            <div
              className="periodic-element social-media"
              data-description="Professional Dota 2 Watcher right here ✌️"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Mu</div>
                <div className="description text-xs font-light">Meetup</div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="Creating GitHub issues, a.k.a. tossing problems which I can solve to the frontend team"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Gt</div>
                <div className="description text-xs font-light">GitHub</div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="Trying to get yarn working after an update. The main reason I toss issues to the frontend team."
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Gl</div>
                <div className="description text-xs font-light">GitLab</div>
              </div>
            </div>
            <div
              className="periodic-element just-trying"
              data-description="A skill I'm trying to learn 🎨... and failing to learn 😛"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Yt</div>
                <div className="description text-xs font-light">Youtube</div>
              </div>
            </div>
            <a
              className="periodic-element just-trying"
              data-description="Resident Designer. Keeping the diminishing flame of web design in me alive 🕯️"
              href="https://tellystats.com"
              target="_blank"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Bo</div>
                <div className="description text-xs font-light">Books</div>
              </div>
            </a>
            <div
              className="periodic-element intense-work"
              data-description="I just need to stop adding items and actually start doing things. Am I the only one who is still using Wunderlist? 😂"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Aws</div>
                <div className="description text-xs font-light">AWS</div>
              </div>
            </div>
            <div
              className="periodic-element fun-stuff"
              data-description="I have zero cooking skills, so I watch cooking videos and never try cooking for real 🍳"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Cv</div>
                <div className="description text-xs font-light">Cooking</div>
              </div>
            </div>
            <div
              className="periodic-element fun-stuff"
              data-description="Or any animal gifs, basically. 🐈🐕🦊🦔🦉🐍🐬🦄"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Dg</div>
                <div className="description text-xs font-light">Dog Gifs</div>
              </div>
            </div>
            <a
              className="periodic-element fun-stuff"
              data-description="Getting distracted by Toggl comics 🙃"
              href="https://blog.toggl.com"
              target="_blank"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Tg</div>
                <div className="description text-xs font-light">Toggl</div>
              </div>
            </a>
            <div
              className="periodic-element just-trying"
              data-description="I google every damn thing. Including movie spoilers. While watching the movie. Yes."
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Gg</div>
                <div className="description text-xs font-light">Google</div>
              </div>
            </div>
            <a
              className="periodic-element just-trying"
              data-description="I like spreadsheets so I create them for the smallest reasons 🧐"
              href="https://docs.google.com/spreadsheets/d/1Dim2nKRjgpkjA4miqTzcLPT68L0B5LU2aWZWF5hHYAc/edit#gid=0"
              target="_blank"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Ex</div>
                <div className="description text-xs font-light">Excel</div>
              </div>
            </a>
            <div
              className="periodic-element intense-work"
              data-description="I still StackOverflow the simplest shit 'just to be sure'. Where will we be without it ❤️"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">So</div>
                <div className="description text-xs font-light">StackOv.</div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="It's very much not my job, but sometimes I stick my hand into the Coding Projects jar 🍪 anyway"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Cd</div>
                <div className="description text-xs font-light">Coding</div>
              </div>
            </div>
            <div
              className="periodic-element just-trying"
              data-description="I spend so much time on Codepen, I decided to go Pro because I felt bad 💸"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Cp</div>
                <div className="description text-xs font-light">Codepen</div>
              </div>
            </div>
            <div
              className="periodic-element just-trying"
              data-description="We all have that one thing that keeps us alive 🛫🗺️"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Tr</div>
                <div className="description text-xs font-light">Travel</div>
              </div>
            </div>
            <a
              className="periodic-element social-media"
              data-description="Fuck this app. It's a terrible love-hate relationship."
              href="https://www.instagram.com/meowliviaaa/"
              target="_blank"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">In</div>
                <div className="description text-xs font-light">Instagram</div>
              </div>
            </a>
            <a
              className="periodic-element fun-stuff"
              data-description="Obsessing over musicals and stalking broadway stars is 👏🏻 not 👏🏻 a 👏🏻 crime!"
              href="https://codepen.io/collection/XPWkdW/"
              target="_blank"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Ga</div>
                <div className="description text-xs font-light">Games</div>
              </div>
            </a>
            <div
              className="periodic-element fun-stuff"
              data-description="I learn memes, I make memes, I breathe memes."
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Me</div>
                <div className="description text-xs font-light">Memes</div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="Battling double columns in Notion"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">No</div>
                <div className="description text-xs font-light">Notion</div>
              </div>
            </div>
            <div
              className="periodic-element social-media"
              data-description="Oh my god. Someone please save me from this Reddit hell hole 😭"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Re</div>
                <div className="description text-xs font-light">Reddit</div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="Research &amp; Documentation nobody asks for 🤓📝"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Gm</div>
                <div className="description text-xs font-light">Gmail</div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="Stats. Data. Stats. Data. 📊 Just lots of reporting."
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Gd</div>
                <div className="description text-xs font-light">Google Doc</div>
              </div>
            </div>
            <div
              className="periodic-element intense-work"
              data-description="Ads. Ads. Ads. If you've seen a Toggl ad, it was me. (Sorry)"
            >
              <div className="periodic-element-inner px-2 py-1">
                <div className="title text-md font-bold">Tw</div>
                <div className="description text-xs font-light">Teamwork</div>
              </div>
            </div>
          </div>
          <div className="legend-table">
            <div className="legend-table__wrapper">
              <span className="legend-table__marker social-media"></span>
              <span className="legend-table__text">Social Media</span>
              <span className="legend-table__marker intense-work"></span>
              <span className="legend-table__text">Serious Work</span>
              <span className="legend-table__marker just-trying"></span>
              <span className="legend-table__text">Personal Development</span>
              <span className="legend-table__marker fun-stuff"></span>
              <span className="legend-table__text">Fun Stuff</span>
              <br />
              <div className="legend-table__direction">
                <span>&#8594; &ensp; Across the table: Importance</span>
              </div>
              <div className="legend-table__direction">
                <span>&#8595; &ensp; Down the table: Time Spent</span>
              </div>
            </div>
          </div>
          <aside className="context">
            <div className="explanation">
              I try to be productive a lot, and I fail a lot, <br /> and I stand
              back up again :)
            </div>
          </aside>
        </section> */}
        {random_quote_data && random_quote_data.content && (
          <section
            id="random-quote"
            className="py-20 px-5"
            style={{
              backgroundColor: rgb,
            }}
          >
            <div className="quote-box max-w-screen-xl lg:w-1/2 md:w-2/3">
              <div id="quote">
                <Transition
                  as={Fragment}
                  show={isShowing}
                  enter="transform transition duration-[400ms]"
                  enterFrom="opacity-0 "
                  enterTo="opacity-100 "
                  leave="transform duration-200 transition ease-in-out"
                  leaveFrom="opacity-100  "
                  leaveTo="opacity-0  "
                >
                  <div>
                    <i className="fa fa-quote-left" style={{ color: rgb }}></i>
                    <blockquote className="quote-text" style={{ color: rgb }}>
                      {random_quote_data.content}
                    </blockquote>
                    <small className="author" style={{ color: rgb }}>
                      -- {random_quote_data.author}
                    </small>
                  </div>
                </Transition>
              </div>

              <button
                className="btn"
                id="new-quote"
                // onClick={random_quote_mutate}
                style={{ backgroundColor: rgb }}
                onClick={() => {
                  setIsShowing(false);
                  resetIsShowing();
                }}
              >
                New Quote
              </button>
              <button className="btn" style={{ backgroundColor: rgb }}>
                <a
                  className="twitter-share-button"
                  href={
                    "https://twitter.com/intent/tweet?text=" +
                    random_quote_data.content +
                    " \n" +
                    "- " +
                    random_quote_data.author
                  }
                  data-size="large"
                >
                  <i className="fa fa-twitter"></i>
                </a>
              </button>
            </div>
          </section>
        )}

        {currently_playing_data && !currently_playing_data.error && (
          <section className="md:py-20 py-10 bg-gray-800">
            <div className="container max-w-screen-xl px-4 w-4/6 m-auto">
              <h1 className="text-2xl mt-2 mb-6 font-bold text-white">
                {currently_playing_data && currently_playing_data.isPlaying
                  ? "Now playing"
                  : "Now paused"}
              </h1>
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full lg:w-5/12 px-4 mb-12 lg:mb-0">
                  <img
                    className="mx-auto lg:mb-10  object-cover"
                    src={
                      currently_playing_data &&
                      currently_playing_data.albumImageUrl
                    }
                    alt=""
                  />
                  {/* TODO: Show Song Progress Bar */}
                  {/* <div className="w-full bg-gray-700 h-1 rounded-lg">
                    <div
                      className="bg-green-500 h-1 rounded-lg"
                      style={{ width: "45%" }}
                    ></div>
                  </div> */}
                </div>
                <div className="w-full lg:w-7/12 px-4">
                  <div className="max-w-xl lg:ml-auto ">
                    <img
                      className="lg:mb-4 md:mb-2 lg:w-32 md:w-20 w-16 mb-3"
                      src="https://static.shuffle.dev/uploads/files/a3/a3cd554fe4981381f50e429bfc300162d2905bc9/Spotify-Logo-RGB-Green.png"
                      alt=""
                    />
                    <h2 className="lg:mb-16 md:mb-6 mb-4 lg:text-5xl md:text-3xl font-bold font-heading text-white">
                      {currently_playing_data && currently_playing_data.title}
                    </h2>
                    {/* <p
                    className="mb-9 text-lg text-gray-500 leading-loose"
                    data-removed="true"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque massa nibh, pulvinar vitae aliquet nec,
                    accumsan aliquet orci.
                  </p> */}
                    <p className="lg:text-2xl md:text-xl text-sm font-bold font-heading text-white">
                      {currently_playing_data && currently_playing_data.artist}
                    </p>
                    <p className="lg:text-lg md:text-sm text-xs text-gray-500 text-gray-300">
                      {currently_playing_data && currently_playing_data.album}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {recently_played_data && !recently_played_data.error && (
          <section className="hidden lg:block md:block md:py-20 py-10 bg-gray-800">
            <div className="container max-w-screen-xl px-4 mx-auto">
              <div className="max-w-2xl mx-auto mb-16 text-center">
                <img
                  className="lg:mb-6 md:mb-4 m-auto lg:w-32 md:w-20 w-16 mb-2"
                  src="https://static.shuffle.dev/uploads/files/a3/a3cd554fe4981381f50e429bfc300162d2905bc9/Spotify-Logo-RGB-Green.png"
                  alt=""
                />
                <h2 className="mt-2 text-4xl lg:text-5xl font-bold font-heading text-white">
                  Recently Played
                </h2>
              </div>
              <div className="flex flex-wrap -mx-4 -mb-4">
                {recently_played_data.items.map((item: any) => {
                  return (
                    <div className="w-full lg:w-1/4 w-1/2 px-4 mb-12">
                      <div className="flex mb-6">
                        <img
                          className="object-cover"
                          src={item.track.album.images[0].url}
                          alt=""
                        />
                      </div>
                      <h2 className="mb-2 text-md font-bold font-heading text-white">
                        {item.track.name}
                      </h2>
                      <p className="mb-4 text-xs leading-loose text-gray-300">
                        {item.track.album.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        <section className="relative py-20 bg-green-500">
          <div className="absolute top-0 left-0 lg:bottom-0 h-112 lg:h-auto w-full lg:w-8/12 bg-gray-800"></div>
          <div className="relative max-w-screen-xl container px-4 mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-5 mb-12 lg:mb-0">
                <div className="text-center lg:text-left">
                  {/* <img
                    className="w-36 mb-6 object-cover inline-flex"
                    src="mockup-assets/logos/spotify_green.png"
                    alt=""
                  /> */}
                  <h2 className="mb-6 text-4xl lg:text-5xl font-bold text-white">
                    Let's vibe on my go to playlist​💃​🕺​🎶​🎉​
                  </h2>

                  {/* <p className="text-gray-50 lg:pr-10 leading-loose">
                    Apart from work, my music defines me.
                  </p> */}
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4 mb-5">
                <div className="lg:max-w-md bg-gray-50 text-center shadow-2xl p-1 rounded">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/3RjnVIZl5eFAgk2uXSt2K4?utm_source=generator&amp;theme=0"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container max-w-screen-xl mx-auto px-4">
            <footer className="py-8">
              <div className="container px-4 mx-auto text-center">
                {/* <a
                  className="inline-block mx-auto text-gray-600 text-2xl leading-none"
                  href="#"
                >
                  <img
                    className="h-8"
                    src="mockup-assets/logos/shuffle-ux.svg"
                    alt=""
                    width="auto"
                  />
                </a> */}
                <ul className="my-10 flex flex-wrap space-x-8 items-center justify-center">
                  <li className="mb-2 md:mb-0">
                    <a
                      className="text-sm text-gray-900 hover:text-gray-700"
                      href="https://analytics.sorathiyakartik.com/share/mKgdevDb/Kartik%20-%20Portfolio"
                      target="_blank"
                    >
                      Site Analytics
                    </a>
                  </li>
                  {/* <li className="mb-2 md:mb-0">
                    <a
                      className="text-sm text-gray-900 hover:text-gray-700"
                      href="#"
                    >
                      Company
                    </a>
                  </li>
                  <li className="mb-2 md:mb-0">
                    <a
                      className="text-sm text-gray-900 hover:text-gray-700"
                      href="#"
                    >
                      Services
                    </a>
                  </li>
                  <li className="mb-2 md:mb-0">
                    <a
                      className="text-sm text-gray-900 hover:text-gray-700"
                      href="#"
                    >
                      Testimonials
                    </a>
                  </li> */}
                </ul>
                <div>
                  <a
                    className="inline-block mr-8"
                    href="https://www.facebook.com/ksorathiya/"
                    target="_blank"
                  >
                    <img
                      src="images/facebook-circle-line-1.svg"
                      alt="Facebook Logo"
                      className=""
                    />
                  </a>
                  <a
                    className="inline-block mr-8"
                    href="https://www.instagram.com/k_sorathiya/"
                    target="_blank"
                  >
                    <img
                      src="images/instagram-line-1.svg"
                      alt="Instagram Logo"
                    />
                  </a>
                  <a
                    className="inline-block"
                    href="https://www.linkedin.com/in/kartiksorathiya/"
                    target="_blank"
                  >
                    <img
                      src="images/linkedin-box-line-1.svg"
                      alt="LinkedIn Logo"
                    />
                  </a>
                </div>
              </div>
              <div className="mt-12 mb-8 border-b border-gray-50"></div>
              <div className="container px-4 mx-auto">
                <p className="text-center text-sm text-gray-400">
                  All rights reserved © Kartik Sorathiya
                </p>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>

    // <div className="content">
    //   <Head>
    //     <title>Introducing Devii</title>
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <div className="introduction">
    //     <h1>Introduction to Devii</h1>
    //     <Markdown source={props.introduction} />
    //   </div>

    //   <div className="section">
    //     <h2>Features</h2>
    //     <div className="medium-wide">
    //       <Markdown source={props.features} />
    //     </div>
    //   </div>

    //   <div className="section">
    //     <h2>My blog posts</h2>
    //     <p>
    //       This section demonstrates the power of dynamic imports. Every Markdown
    //       file under <code>/md/blog</code> is automatically parsed into a
    //       structured TypeScript object and available in the{' '}
    //       <code>props.posts</code> array. These blog post "cards" are
    //       implemented in the
    //       <code>/components/PostCard.tsx</code> component.
    //     </p>
    //     <div className="post-card-container">
    //       {props.posts.map((post, j) => {
    //         return <PostCard post={post} key={j} />;
    //       })}
    //     </div>
    //   </div>

    //   <div className="section">
    //     <h2>Testimonials</h2>
    //     <blockquote>
    //       <p>
    //         <em>Seems like it might be useful!</em>
    //       </p>
    //       <p>
    //         — Dan Abramov, taken{' '}
    //         <a
    //           href="https://github.com/colinhacks/devii/issues/2"
    //           target="_blank"
    //         >
    //           {' '}
    //           utterly out of context
    //         </a>
    //       </p>
    //     </blockquote>
    //   </div>

    //   {/* <div className="section">
    //     <h2>README.md</h2>
    //     <p>
    //       Below is the README.md for devii. It was imported and rendered using
    //       Next.js dynamic imports. The rest of this page (including this
    //       paragraph) are rendered with React. You can also read the README on
    //       GitHub at{' '}
    //       <a href="https://github.com/colinhacks/devii">
    //         https://github.com/colinhacks/devii
    //       </a>
    //       .
    //     </p>
    //   </div> */}

    //   {/* <div className="section alternate">
    //     <div className="narrow">
    //       <Markdown source={props.readme} />
    //     </div>
    //   </div> */}

    //   <div className="section alternate">
    //     <h2 className="centered">Get started</h2>
    //     <a href="https://github.com/colinhacks/devii">
    //       <button className="fork-button">Go to README</button>
    //     </a>
    //   </div>
    // </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const introduction = await loadMarkdownFile("introduction.md");
  const features = await loadMarkdownFile("features.md");
  const readmeFile = await import(`../${"README.md"}`);
  const readme = readmeFile.default;
  const posts = await loadBlogPosts();

  // comment out to turn off RSS generation during build step.
  await generateRSS(posts);

  const props = {
    introduction: introduction.contents,
    features: features.contents,
    readme: readme,
    posts,
  };

  return { props };
};
