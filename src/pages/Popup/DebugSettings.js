import React, { useState, useEffect } from 'react'

const detachDebugger = () => {
  chrome.debugger.getTargets((tabs) => {
    for (const tab in tabs) {
      if (tabs[tab].attached && tabs[tab].tabId) {
        chrome.debugger.detach({ tabId: tabs[tab].tabId })
      }
    }
  })
}

const DebugSettings = ({ type, ip }) => {
  const [value, setValue] = useState('')
  const [matchIP, setMatchIP] = useState(false)
  const matchIPStorage = `${type}MatchIP`

  useEffect(() => {
    chrome.storage.sync.get([type, matchIPStorage], (result) => {
      setMatchIP(result[matchIPStorage])

      if (result[matchIPStorage] && !result[type]) {
        setValue(ip[type])
        chrome.storage.sync.set({ [type]: ip[type] })
      } else {
        setValue(result[type])
      }
    })
  }, [ip, matchIPStorage, type])

  const toggleMatchIP = () => {
    chrome.storage.sync.set({ [matchIPStorage]: !matchIP })

    if (!matchIP) setValue(ip[type])

    setMatchIP(!matchIP)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0 0 0',
      }}
    >
      <label>
        <input
          type="text"
          value={value}
          // onChange={() => setMatchIP(!matchIP)}
          style={{
            width: '120px',
            margin: '0 5px 0 0',
          }}
        />
        {type}
      </label>
      <label>
        <input
          type="checkbox"
          checked={matchIP}
          onChange={() => toggleMatchIP()}
        />
        Match IP
      </label>
    </div>
  )
}

export default DebugSettings