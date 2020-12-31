export const pageAnimation = {
    hidden: {
        opacity: 0,
        y: 300,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            staggerChildren: 0.25,
            ease: "easeOut"
        },
    },
};

export const titleAnim = {
    hidden: {
        y: 200,
    },
    show: {
        y: 0,
        transition: {
            duration: 1,
            ease: "easeOut"
        },
    },
};