import React from 'react'

import { HighlightsPropsType } from '../../types/prop-types'

import styles from './highlight-text.module.css'


export const Highlight = ({ title, bookName }: HighlightsPropsType) => {
  if(!bookName) {
    return <span>{title}</span>
  }
  const regExp = new RegExp(bookName, 'gi');
  const matchText = title.match(regExp)

  if(matchText) {
    return (
    <React.Fragment>
      {title.split(regExp).map((item, i, arr) => {
        if(i < arr.length - 1) {
          const matched = matchText.shift()

          return (
            <span>
              {item}
              <span className={styles.highlight}  data-test-id='highlight-matches'>{matched}</span>
            </span>
          )
        }

        return <span>{item}</span>
      })}
    </React.Fragment>
    )
  }

  return (
      <span>{title}</span>
  )
}
