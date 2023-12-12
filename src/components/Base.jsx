import CustomNavbar from "./CustomNavbar";

const Base = ({title = "Inventment Manager", children}) =>
{
    return(
        <div>
            <CustomNavbar/>
            {children}
        </div>
    );
};
export default Base;