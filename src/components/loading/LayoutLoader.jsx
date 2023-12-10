import { Frame, Loading } from '@shopify/polaris';

const LayoutLoader = () => {
    return (
        <div style={{ height: '100px' }}>
            <Frame>
                <Loading />
            </Frame>
        </div>
    );
}

export default LayoutLoader