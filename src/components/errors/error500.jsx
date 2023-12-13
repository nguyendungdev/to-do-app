import { Button, Page } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";


const Error500 = () => {
    const navigate = useNavigate();

    const handleNavigateToHomepage = () => {
        return navigate('/');
    };

    return (<Page>
        <Button variant="primary" tone="critical" onClick={handleNavigateToHomepage}>
            Về lại trang chủ
        </Button>
    </Page>)
}
export default Error500;
