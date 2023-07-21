import React from 'react'
import { css } from '@emotion/css'
import styles from './app.module.less'

type Props = {}

const color: string = 'white'

export default function App({}: Props) {
	return (
		<div>
			<div className="title">App--hello1</div>
			<div
				className={css`
					padding: 32px;
					background-color: pink;
					&: hover {
						color: ${color};
					}
				`}
			>
				hello -emotion
			</div>
			<div className={styles.hello}>hello - css module</div>
			<div className="text-blue-600 text-lg">hello - tailwindcss</div>
		</div>
	)
}
