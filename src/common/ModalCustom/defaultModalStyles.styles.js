const defaultModalStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        backgroundColor: "rgba(18, 17, 28, 0.8)",
        backdropFilter: "blur(4px)",
        zIndex: 999,
        padding: 20,
    },
    content: {
        top: "unset",
        left: "unset",
        right: "unset",
        bottom: "unset",
        width: "max-content",
        maxWidth: "unset",
        maxHeight: "100%",
        backgroundColor: "transparent",
        boxShadow: "none",
        borderRadius: "0",
        padding: "0",
        position: "relative",
        border: "none",
        margin: "auto",
        overscrollBehaviorY: "contain",
    },
};

export default defaultModalStyles