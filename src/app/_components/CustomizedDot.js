const CustomizedDot = (props) => {
    const { cx, cy, payload, radius } = props;
    return (
        <image
            href="../assets/img/wolle.png"
            x={cx - 20}
            y={cy - 20} 
            width={radius}
            height={radius}
        />
    );
};

export default CustomizedDot;