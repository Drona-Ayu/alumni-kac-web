import { Route, Routes } from 'react-router-dom'
import { SkipLink } from '@/components/atoms/SkipLink'
import { SiteHeader } from '@/components/organisms/SiteHeader'
import { SiteFooter } from '@/components/organisms/SiteFooter'
import { ScrollToTop } from '@/components/organisms/ScrollToTop'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Committee } from '@/pages/Committee'
import { Events } from '@/pages/Events'
import { EventDetail } from '@/pages/EventDetail'
import { Gallery } from '@/pages/Gallery'
import { Membership } from '@/pages/Membership'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'

export function App() {
  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}
