import { TopBar, Frame, } from '@shopify/polaris';
import { ArrowLeftMinor, } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import './style.scss';
import { Outlet } from 'react-router-dom';

function MainLayout() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
    );


    const handleNavigationToggle = useCallback(() => {
        console.log('toggle navigation visibility');
    }, []);
    const logo = {
        topBarSource: 'https://cdn1.avada.io/logo/avada_logo_final_color.png',
        width: 100,
        url: '',
        accessibilityLabel: 'Shopify',
    };

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={[
                {
                    items: [{ content: 'Back to Shopify', icon: ArrowLeftMinor }],
                },
                {
                    items: [{ content: 'Community forums' }],
                },
            ]}
            initials="D"
            name="Dharma"
            detail="Jaded Pixel"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            onNavigationToggle={handleNavigationToggle}

        />
    );

    return (
        <Frame topBar={topBarMarkup} logo={logo} >
            <Outlet />
        </Frame>
    );
}


export default MainLayout;
