"use client"

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Link as LinkScroll } from "react-scroll";
import {Button} from "@/components/ui/button";

const LandingPage = () => {
    const router = useRouter();
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const isExtraSmall = useMediaQuery({ query: "(max-width: 600px)" });
    const isSmall = useMediaQuery({ query: "(max-width: 768px)" });
    const isMobileOrTablet = isSmall || isExtraSmall;

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 32);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const goto = () => {
        router.push("/home");
    };

    const NavLink = ({ title }) => (
        <LinkScroll
            onClick={() => setIsOpen(false)}
            to={title}
            offset={-100}
            spy
            smooth
            activeClass="nav-active"
            className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer flex items-center gap-2"
        >
            {title}
        </LinkScroll>
    );

    return (
        <div className="overflow-hidden">
            {/* Header */}
            <header
                className={`fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 ${hasScrolled ? "py-2 bg-black-100 backdrop-blur-[8px]" : ""}`}
            >
                <div className="container flex h-14 items-center justify-between">
                    {/* Hide header logo when in mobile or tablet view */}
                    {!isMobileOrTablet && (
                        <a className="lg:hidden flex-1 cursor-pointer z-2">
                            <img src="/favicon.ico" width={115} height={55} alt="logo" />
                        </a>
                    )}
                    <div
                        className={`w-full ${isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"}`}
                    >
                        <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6">
                            <nav>
                                <ul className={`flex ${isMobileOrTablet ? 'flex-col items-center' : 'flex-row'} max-lg:px-12`}>
                                    <li className="nav-li">
                                        <NavLink title="features" />
                                        <div className="dot" />
                                    </li>
                                    <li className="nav-logo">
                                        {/* Hide logo on mobile or tablet view */}
                                        {!isMobileOrTablet && (
                                            <LinkScroll
                                                to="hero"
                                                offset={-250}
                                                spy
                                                smooth
                                                className="max-lg:hidden transition-transform duration-500 cursor-pointer"
                                            >
                                                <img src="/favicon.ico" width={50} height={35} alt="logo" />
                                            </LinkScroll>
                                        )}
                                    </li>
                                    <li className="nav-li">
                                        <div className="dot" />
                                        <NavLink title="download" />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <button
                        className={`lg:hidden z-2 border-2 border-s4/25 rounded-full flex justify-center items-center ${isMobileOrTablet ? 'p-2' : 'p-3'}`}
                        onClick={() => setIsOpen((prevState) => !prevState)}
                    >
                        <img
                            src={`/images/${isOpen ? "close" : "magic"}.svg`}
                            alt="toggle"
                            className={`size-1/2 object-contain ${isMobileOrTablet ? 'w-8 h-8' : 'w-10 h-10'}`}
                        />
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className={`relative bg-blue-950 pt-60 pb-40 ${isMobileOrTablet ? 'pt-52 pb-36' : ''}`}>
                <LinkScroll name="hero">
                    <div className="container bg-blue-950">
                        <div className={`relative z-2 ${isMobileOrTablet ? 'max-w-full' : 'max-w-512 max-lg:max-w-388'}`}>
                            <div className="caption small-2 uppercase text-p3">ZERO TO ONE</div>
                            <h1 className={`mb-6 h1 text-p4 uppercase ${isMobileOrTablet ? 'max-lg:mb-7 max-md:mb-4 max-md:text-3xl max-md:leading-10' : 'max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12'}`}>
                                Amazingly simple
                            </h1>
                            <p className={`max-w-440 mb-14 body-1 ${isMobileOrTablet ? 'max-md:mb-10 text-sm' : 'max-md:mb-10'}`}>
                                Capture website snapshots, generate random user data, and create QR code PDFs—all in one app!
                            </p>
                            <LinkScroll onClick={goto} to="features" offset={-100} spy smooth>
                                <Button icon="/images/zap.svg" className="cursor-pointer">Try it now</Button>
                            </LinkScroll>
                        </div>

                        <div className={`absolute ${isMobileOrTablet ? '-top-20 left-0' : '-top-32 left-[calc(50%-340px)]'} w-full pointer-events-none hero-img_res`}>
                            <img
                                src="/images/hero.png"
                                className={`size-1230 ${isMobileOrTablet ? 'h-auto' : 'max-lg:h-auto'}`}
                                alt="hero"
                            />
                        </div>
                    </div>
                </LinkScroll>
            </section>

            {/* Features Section */}
            <section className="bg-blue-950 pb-4">
                <LinkScroll name="features">
                    <div className="container">
                        <div className="relative flex flex-col md:flex-row border-2 border-s3 rounded-7xl md:overflow-hidden max-md:gap-3">
                            {/* Map through features */}
                            {/* Example feature item */}
                            <div className="relative p-4 z-2 md:px-10 px-5 pb-5 flex-50">
                                <div className="w-full flex justify-start items-start">
                                    <div className="-ml-3 mb-12 flex items-center justify-center">
                                        <div className="w-0.5 h-16 bg-s3 hidden" />
                                        <img
                                            src="/images/feature-icon.svg"
                                            className="size-28 object-contain"
                                            alt="feature"
                                        />
                                    </div>
                                </div>

                                <p className="caption mb-5">Feature Caption</p>
                                <h2 className="max-w-400 mb-7 h3 text-p4 text-center text-xl">Feature Title</h2>
                                <p className="mb-11 body-1 text-center">Feature Description</p>
                                <NavLink to="#link">
                                    <Button icon="/images/button-icon.svg" className="w-full py-3 text-lg">Feature Button</Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </LinkScroll>
            </section>

            {/* Download Section */}
            <section className="bg-blue-950 pb-4">
                <div className="container text-center py-10">
                    <Button icon="/images/download.svg" className="cursor-pointer">Download Now</Button>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-blue-950">
                <div className="container py-10">
                    <div className="flex w-full flex-col items-center">
                        <div className="flex flex-1 flex-wrap items-center justify-center gap-5 text-center">
                            {/* Map through socials */}
                            <a href="#" className="base-bold text-p3">
                                <img src="/images/social-icon.svg" alt="social" className="max-w-7 max-h-7" />
                            </a>
                        </div>
                        <div className="mt-5 text-p2">
                            {/* Map through details */}
                            <p className="mb-1">Detail Text</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
