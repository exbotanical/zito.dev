import type { ResponseData } from '../types'

// skip dev given the dev server does not build RSS assets
if (Cypress.env('STAGE') !== 'dev') {
  describe('sitemap', () => {
    it('contains valid urls', () => {
      cy.request('/sitemap/sitemap-0.xml').then(response => {
        const data = response as unknown as ResponseData

        cy.task('parseSitemap', {
          siteUrl: 'https://zito.fyi',
          sitemapString: data.body,
        }).then(sitemapLinks => {
          const links = sitemapLinks as string[]
          expect(links).to.include('/my-favorite-soft-machine-records')

          links.forEach(link => {
            cy.visit(link)
          })
        })
      })
    })
  })
}
