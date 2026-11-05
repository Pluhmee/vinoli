import { Outlet } from 'react-router-dom';
import { Navbar } from '@/layouts/Navbar';
import { Footer } from '@/layouts/Footer';
import { CartDrawer } from '@/components/food/CartDrawer';
import { LoginModal } from '@/components/common/LoginModal';
import { CatererRegisterModal } from '@/components/catering/CatererRegisterModal';

export function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <CartDrawer />
      <LoginModal />
      <CatererRegisterModal />

      <Footer />
    </div>
  );
}
