import {
  Twitter as TwitterIcon,
  LinkedinSquare as LinkedInIcon,
  FacebookCircle as FacebookIcon,
  Reddit as RedditIcon,
} from '@styled-icons/boxicons-logos'
import React, { useState } from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} from 'react-share'
import styled, { css } from 'styled-components'

import { useConfig } from '@/config'
import type { Post, SiteConfig } from '@/types'

import { LinkCopyNotification } from './LinkCopyNotification'
import * as S from './styles'

interface PostShareProps {
  post: Post
}

const ICON_SIZE = 60

function generateRelatedTwitterHandles(config: SiteConfig): string[] {
  const relatedTwitterHandles = []

  if (config.user.twitterHandle) {
    relatedTwitterHandles.push(config.user.twitterHandle)
  }

  if (config.site.twitterHandle) {
    relatedTwitterHandles.push(config.site.twitterHandle)
  }

  return relatedTwitterHandles
}

const HoverStyle = css`
  transition-duration: 300ms;
  transition-property: color, background-color, opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.25);
  }
`

const FacebookShare = styled(FacebookShareButton)`
  ${HoverStyle}
`

const TwitterShare = styled(TwitterShareButton)`
  ${HoverStyle}
`

const RedditShare = styled(RedditShareButton)`
  ${HoverStyle}
`

const LinkedinShare = styled(LinkedinShareButton)`
  ${HoverStyle}
`

export function PostShare({ post }: PostShareProps): JSX.Element {
  const { title, excerpt, url } = post

  // eslint-disable-next-line react/hook-use-state
  const [showLinkNotification, setShowlinkNotification] = useState(false)

  const config = useConfig()
  const relatedTwitterHandles = generateRelatedTwitterHandles(config)

  return (
    <S.Wrapper aria-label="Share on social media">
      <S.LinkWrapper>
        <S.Label>SHARE</S.Label>
        <S.LinkGrid>
          <FacebookShare quote={excerpt} url={url}>
            <FacebookIcon size={ICON_SIZE} fill="rgb(66, 103, 178)"/>
          </FacebookShare>

          <TwitterShare
            related={relatedTwitterHandles}
            title={title}
            url={url}
            via={config.site.name}
          >
            <TwitterIcon size={ICON_SIZE} fill="rgb(29, 161, 242)"/>
          </TwitterShare>
          <RedditShare title={title} url={url}>
            <RedditIcon size={ICON_SIZE} fill="rgb(255, 86, 0)"/>
          </RedditShare>
          <LinkedinShare
            source={config.site.name}
            summary={excerpt}
            title={title}
            url={url}
          >
            <LinkedInIcon size={ICON_SIZE} fill="rgb(0, 119, 181)" />
          </LinkedinShare>
          <S.LinkButton
            onClick={() => {
              void navigator.clipboard.writeText(url)
              setShowlinkNotification(true)
            }}
            size={ICON_SIZE}
          />
          {showLinkNotification && (
            <LinkCopyNotification
              onAnimationEnd={() => {
                setShowlinkNotification(false)
              }}
            />
          )}
        </S.LinkGrid>
      </S.LinkWrapper>
      {/* <Separator /> */}
    </S.Wrapper>
  )
}
