
import { Product, Category } from './types';

export const STORE_NAME = "Dr. Nurse Collections";

export const GALLERY_IMAGES = [
  {
    id: 'g1',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/465820330_18062561299754000_4933707832149053440_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ns0e66Xb79cQ7kNvwGI2ZDc&_nc_oc=Adn6kD8CHttk0aGWlHpXUuFW7_ppgsPEl4qYl2xQ66MK6pqcr7TOghriWG6Aee2DuBQ&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=p-Y8s3NEDt1ZFw63T6W9nQ&oh=00_Aflj-Io00wu72yqwYyTWRdVF7tObvW5E9WUJz3H5K1HCFA&oe=69410E4E',
    title: 'Professional Medical Attire',
    category: 'Scrubs'
  },
  {
    id: 'g2',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/586665159_18099391201754000_6441846513481508042_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=loG2Laa1Oo4Q7kNvwHENBwK&_nc_oc=AdlwsgqNnqj2005bVtcExd9cRLN8yjEl62tS-p4ZwXw50l_3-KzMKsLNFDYnzLXaFMg&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=c4OdcY2m2rFswK5ge6XTUQ&oh=00_AfkFkHALyGoPJ4qzyZ-BLqr3jZDiJKuBAE1T9cCqY-8nuA&oe=69410295',
    title: 'Modern Fit Uniforms',
    category: 'Uniforms'
  },
  {
    id: 'g3',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/587016895_18099391189754000_3946265288257931032_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=P65oKgGr8KYQ7kNvwHTb4Be&_nc_oc=Adm9OmpIpB-nQvUAt3qCg2_5W32lenF9zx4oUaqIhcqvGKi-qK0gTc6jCzVVbDnp2RY&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=IGa2df0l_oOLMs7NGBH85A&oh=00_AfmDfA2J8o8VfVwHcFvFj5FpDugAH9-wv40mbjMPNLi5qw&oe=69410D00',
    title: 'Premium Lab Coats',
    category: 'Lab Coats'
  },
  {
    id: 'g4',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/581849403_18099170491754000_5050526168048398236_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cHYtPsSGdeUQ7kNvwHtK0jX&_nc_oc=AdmCGfA3yaSM4p9NC72dV7aS8xg3l9i6FqxZGH5XCw5MMhwln8MzL3fGtESHTHGteRs&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=OHFoUhUFu5TpSbudF20Dug&oh=00_AfkC5tulgo50hnMtt3EwdjmEoTLlxRsNcaJd7y1a7_OlIw&oe=69410E9A',
    title: 'Stylish Scrubs',
    category: 'Scrubs'
  },
  {
    id: 'g5',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/581594337_18099170482754000_504775623240907640_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LT1iaICPv8AQ7kNvwELMQk7&_nc_oc=AdmYpBg0QvIauLHeoVVj-lVsyM0sVsFxt-z3gTkt7daue07DtMNhgOkQH_sRY8Z97NM&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=H8NW9e1TOXXpja2w2phW5w&oh=00_AfnpHHEHSCY2q50gbfTScgO-Lv8L35I-dzNCvgvbkzmg-w&oe=694114A7',
    title: 'Custom Embroidery',
    category: 'Customization'
  },
  {
    id: 'g6',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/573422655_18097702234754000_8500844677970400317_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=iXY-2lFpugAQ7kNvwFnq71C&_nc_oc=AdkFRdRKl_ZSnKAhzKpcw9A4mTmSXzDQkX1cwOexQc3Wxvm4jl4v96-gewAIX55j6UM&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=5uiGs2zlvG_t7FUB7NOutQ&oh=00_Afn1EDCaqhoOJMLecbhLjNDL1o50GsinOaeqmLjeGqzUkQ&oe=69411902',
    title: 'Clinical Excellence',
    category: 'Equipment'
  },
  {
    id: 'g7',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/572276139_18097365955754000_119886070141880688_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rYDipLGAjjgQ7kNvwGAZRg-&_nc_oc=AdlaeQQEhAFz-DpbAFPlRO7tBLJG_oNFMe82HQfGIZyuu1wKDRDCWPXaMAvuFKBUJ7U&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=86vRIvn43kV38-TzqKPqng&oh=00_AfmeKbZB7RKUZYPoRmZxuXxz4hRX2SGB5fp0t2N0RwTKcg&oe=6940FE16',
    title: 'Team Uniforms',
    category: 'Uniforms'
  },
  {
    id: 'g8',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/565213504_18095852845754000_8930957689818514254_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=B0B7Gr0DN8QQ7kNvwEsTdlN&_nc_oc=AdkCsAdx8IHZesc6XQxWUW8mLjpsNybM2qnYlq9gDQTTyPvxbhbVIIuIpKVfgBmsykg&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=h6sY-6NpTtJTZ99mZXUVJQ&oh=00_AfmAI-NJMaocN6eZqlEq-5O_DkfHeuhElLYMt4uhoQMUwA&oe=6940F329',
    title: 'Comfortable Footwear',
    category: 'Shoes'
  },
  {
    id: 'g9',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/567156538_18095657533754000_6135808514494162501_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=RBw8BhqmkYIQ7kNvwEWYzlT&_nc_oc=AdlZC3MO2YxYj58sy2Oxxd1Vl4_UjWi0wr9kQr6kXHSnt1N-o6PUOMLttHg6NMNDAek&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=LzJEJIQNot1uSkzMUG6wUA&oh=00_AfkjGQ2BdD2BbR3iR_N5bjXYZW7Thpl1DXbngOMDDjpK0w&oe=6941069D',
    title: 'Designer Scrubs',
    category: 'Scrubs'
  },
  {
    id: 'g10',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/566192764_18095657542754000_8641897188582459431_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=OWhADRbUjnIQ7kNvwH1hHb0&_nc_oc=AdlRGkF4HVL1Rm9RqkzHgnwJkDC2FULX9uBv5V9wscsSYXqOwjLo-lOCEcaj46EbH3A&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=y_EEV3YhwJsII29wbSiIxA&oh=00_AflBfRIUIluTf1D33LgoVdftBROk3qf2f33-9jQ6mf2Ekg&oe=6941273C',
    title: 'Protective Gear',
    category: 'Accessories'
  },
  {
    id: 'g11',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/550352353_18091736458754000_7767824232662568962_n.jpg?stp=dst-jpegr_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=qOU4nRjE-YwQ7kNvwFUtlD4&_nc_oc=AdkTJ36Ihi7p9Y2kaKPP2EaWfPYBJP0KqI2w5Js0Na2tokMV9ae-Sb7nAYDcVBWDvhI&_nc_zt=23&se=-1&_nc_ht=scontent.fdar5-1.fna&_nc_gid=ZO0c6qzyYrlnXD2pIVTw5Q&oh=00_AfmyyrcatHhX8ED_qyeu_PrHtclKtoTZrOeyApaNtdNblg&oe=694121F2',
    title: 'Elegant Designs',
    category: 'Scrubs'
  },
  {
    id: 'g12',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/548527177_18091332853754000_1095918348657140217_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-W9xNL3bhuAQ7kNvwFPMunl&_nc_oc=AdnNDxUG6KOMefkryC52dBtOVFEAaflRV5WhDHme1uke5E_dFDt09VYNaGXAYdiNUaE&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=1wJTZlqkyy8d0pJqqarCLg&oh=00_AfkCxVcpLg-Qix5eAdsY7r_kXBH2J4tgLZIVWSMbUDEClg&oe=6940F538',
    title: 'Signature Collection',
    category: 'Uniforms'
  },
  {
    id: 'g13',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/541518866_18090411823754000_4067592116492292408_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Eso2dWOFhGAQ7kNvwHkNkdT&_nc_oc=AdmMBfPFMcIKEw9OXUpwbimbuCOjWUrb-TkWRf6qRRR2tqEenELsC48sKd6DrbWYaUI&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=zuDPp4yKcF5atfFrTaD-0g&oh=00_AfkjBrWV8t8NyxVk8Fpzw52nwEp5yrB2UMAKbBRl1A3g2g&oe=6940F2E5',
    title: 'Professional Look',
    category: 'Lab Coats'
  },
  {
    id: 'g14',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/542075700_18090411814754000_5538732334258959264_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=lUaYjeBKdyQQ7kNvwFcoyAz&_nc_oc=AdmyHXBWTpyQ8X1B_TGSCohz5JSyD6sYinqpIQyn3qPdLvDdF90M-y1OkfJYm-KE3rQ&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=rasHo0-cwOH3goN7mECK8w&oh=00_Afk4bja4emIWeSXCUikJxJT7zT-Yd1e5-neH4PZbfOAFRg&oe=69410CFB',
    title: 'High Quality Fabric',
    category: 'Scrubs'
  },
  {
    id: 'g15',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/542358622_18090411805754000_8937462360431143483_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=UYSpH_XFItwQ7kNvwFRuXHB&_nc_oc=AdlJVip1MI1yBE5dK-RA1iXQartCAWWjqDFlaPs3qc1MBHZ2XYyV_c4kG0vZPXLVwFI&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=q4uPKMBkkf_0dUFMOrXogw&oh=00_Afm0l-C7bckadsp5rQCAzK0YH69cWAXxGgY9ivXGXkI-Uw&oe=69411465',
    title: 'Daily Essentials',
    category: 'Accessories'
  },
  {
    id: 'g16',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/533080956_18088901842754000_4240067807601829725_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=UsMFTUhRwscQ7kNvwHP3tmE&_nc_oc=Adnyr8bgruefX31e5PfyuhmsgfrCsWzUxlKfffFJLUdIBnaP1-jK-YankUI_boMvmZU&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=umFeznMvEW-sQBUTzGg6CQ&oh=00_Afkqz84V33n5DIUfKP2XuNq97X68yia44S_IXyOJePT_lg&oe=69412493',
    title: 'Advanced Equipment',
    category: 'Equipment'
  },
  {
    id: 'g17',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/535156781_18088901851754000_4727044232035089052_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1tXV_E0OzLAQ7kNvwFqlcxW&_nc_oc=Adn_54pMcMz_cc72ndYbH5tRE9riV7ZQPNDd9MUvNVRpuZUrYxmd-oo60PCP6Demgng&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=Ej29TCGq0mv6gtblA0NxwQ&oh=00_AfkTQ_GS83Y8CVCVXoRSh_Psabh_tI5xOG4gDb99NJbgxg&oe=69412716',
    title: 'Color Varieties',
    category: 'Scrubs'
  },
  {
    id: 'g18',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/533080956_18088901833754000_3341916652024595849_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=dC0V_PzAVWQQ7kNvwFVSIkF&_nc_oc=AdnPPXyvB4o2LvK-cunkWE6t3mpgZQE7uQk10B7k9FwHQm3hwCci_sbKsoTt1A5vG7I&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=fLlXkZbvcV0YanKSDSHnjw&oh=00_AfkYhfWA2V5K4PQ2gSGKwclZa3wTjN66xWTRdSz059j-ZQ&oe=6940FAD7',
    title: 'Medical Devices',
    category: 'Equipment'
  },
  {
    id: 'g19',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/516608708_18085306657754000_5874571342186482719_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=IeAH4Ys8u0MQ7kNvwFmB4Bj&_nc_oc=AdmSMH1SIs2QwxRYrvjZEEHdVlC_djz9y-oimfNtIwtGB3LvMQ4bb3LcKHQD5rpUQaY&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=m28-Bkn597a0ZVU-KpALLA&oh=00_AfkP0id4Fy2OJgUtm58gFXuYrytYkdKj3QqZ0v6bQbmOkg&oe=6941157F',
    title: 'Tailored Fits',
    category: 'Uniforms'
  },
  {
    id: 'g20',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.82787-15/514633021_18084635860754000_412995266328135055_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YmYR1C84LSAQ7kNvwGkBrEZ&_nc_oc=AdnWFr0YZrz0-OOD6Z8yX5ylpt2paVEO2h3E2cY7JVe6ARZkv9o-gWcucFZeK22su9g&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=ecEnQjiRcJkMBQn5IOW8hg&oh=00_AfkNxUE0vyRwZ2CSqXGJu-v4vRXRL2G7WiO40knYqovSLA&oe=69410FFF',
    title: 'Exclusive Prints',
    category: 'Scrubs'
  },
  {
    id: 'g21',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/514373948_18084635557754000_4650132384899799026_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Bw6drJBfr5cQ7kNvwGANO8N&_nc_oc=AdnCqTYClnD5A7hWYeG_czNtnWYW0J2fIcHVMGw769ykvXA3RKwtqSprO0bOcMQiOQc&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=n2-xcv5JEgs3i7_5G0uQSw&oh=00_AfnjJZNALv-AqsUAyCTY7vCtruFhQrQdFZHy7y7fosUzsg&oe=69411872',
    title: 'Comfort Wear',
    category: 'Scrubs'
  },
  {
    id: 'g22',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.75761-15/505190090_18083092708754000_6327944848226773329_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=osr7M-UBup4Q7kNvwEy2yyV&_nc_oc=AdmZkCXDkOYlrK-0DJF52W7AadQYDVVdcXaNv2szCqPup-iLI9zrsuGiWihoXseKH0s&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=2Wya6hhDDYQolLV3-1MrNw&oh=00_AfmtWBQ4IxPxWBLU-DJDoQ82q0cNtaN-6b9jbgGZhIelQw&oe=694119FE',
    title: 'Surgical Caps',
    category: 'Accessories'
  },
  {
    id: 'g23',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.75761-15/500568730_18081434179754000_1815602206753171149_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=16xasFzBDUwQ7kNvwEeryU5&_nc_oc=Adl98vsfShlwRol1gHK8TX8TU15HvEStPviIAUte8aMfXWtUtTa4c_OS68W8UjxG1D8&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=fprmKmj_2mLehstNC-BlpA&oh=00_AflHimol_pGQFN1uQsYdjKnh6t2RwByzWzzcWjajPj9jcQ&oe=6940F80C',
    title: 'Detailed Stitching',
    category: 'Customization'
  },
  {
    id: 'g24',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/491671969_18078581071754000_1888426381043062234_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3Y0ZKSqUQIoQ7kNvwEQ_EAU&_nc_oc=AdkKmWNntlKVLaQvpmB0_nhhTAndI7eeicZWe8aTO3xL9p6wW6TmiWCk45GonY2bLgg&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=rGnltT0lceqMRb2huKkVPQ&oh=00_AfnxBS2hGCRuvG7r3EzqbCKBPWTBBb1oykP_drQ6eFLznw&oe=69410111',
    title: 'Professional Attire',
    category: 'Uniforms'
  },
  {
    id: 'g25',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/487088197_18076320046754000_354211264212885006_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bzehB83fbbkQ7kNvwHSduNd&_nc_oc=AdlBpP6XdB1NqttkkklVn3wbSrrRExJO_Xg3LRmd8U_vMOY_IjnYEaT0PdkBns3G0N4&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=YJAn1Q47_VaZITAAHV_-sQ&oh=00_AfmSyzKsRZ38CoDxGwlJqF8KTcKDeZm_ZHMtTt8g4HLsbA&oe=69411DF7',
    title: 'Durable Workwear',
    category: 'Scrubs'
  },
  {
    id: 'g26',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.75761-15/487087067_18076319977754000_1550071865541141108_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=aSyp-vIAjLgQ7kNvwEunk_b&_nc_oc=Adllxhron9SGr6-BIg9hLeMgnRptQ45IzI_L7olqFgezfVKK63Fof0bjC19jD6sKdBU&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=mZvCL0BPyT_VBAwfE6nAgw&oh=00_Afl7nlQ2MPccCq58uGGFhM9KqrcPQ5sErYt-3jVaFLmQCA&oe=694109AE',
    title: 'Nurse Essentials',
    category: 'Accessories'
  },
  {
    id: 'g27',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/485844175_18075575902754000_8008837187564539112_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NXc4JYOWGnEQ7kNvwEoMqMa&_nc_oc=Adk75WnB1A6ryGuaUcnNTio_uvZCCReoLwdUI21PKO9Silh5ZEvWzNVPzWG8CRl9zBo&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=MpG8V2fU3OP8vovW9ZgSew&oh=00_AflBxW8NdacjPO0wo5SgZiEdv3O4n8HohlsM_CxnvmrOXg&oe=6941156C',
    title: 'Ward Ready',
    category: 'Uniforms'
  },
  {
    id: 'g28',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.75761-15/486070505_18075575929754000_7124160799970926037_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tv1hBjRec4UQ7kNvwHH0_25&_nc_oc=Admi853c-at8HImemcxP8iG7qT5i02hxC7TkY9x6bFFR_Na2eL_Pvfpd1p1CDSezdOc&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=pLoHPnUXxqc2MJoTvlIWNA&oh=00_AfkwL8HpF-yZ2cP_A4e7LvQNNKX00cUovVKzetfsZLsUpA&oe=69411FCA',
    title: 'Hospital Fashion',
    category: 'Scrubs'
  },
  {
    id: 'g29',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/481086341_18072758479754000_7253085918198930678_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=UZo5ciKGn3oQ7kNvwGRyN3x&_nc_oc=Adm97p-wYEWFE33E_bWnhPkUPe3kHJ7SyG-GHxnNhx7WgTlPFuhwKxcPwQEs2tfAiIc&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=N49cgRIZwxO8qGW-2Cjoww&oh=00_Aflpf13kMnP9F-Ne4g_jQzTCkYFtlLUgAyPqUElizPqb9A&oe=69412102',
    title: 'Medical Scrubs',
    category: 'Scrubs'
  },
  {
    id: 'g30',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.75761-15/480718071_18072758467754000_263471303367218661_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LtBT4vhKI8kQ7kNvwGXW1yW&_nc_oc=Adm5R5ex90eegUDsPhUWx32abVRy3efFtk2875-j1C6S7HxQd4ri3KU4MvN8H5ueIeE&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=9FmOu7HeAEZM_Gz6e4N1Ow&oh=00_AfnBZrBMvER3pTvGFBAPVDGQC-G6_PPDaWk4sqK7dpVM5A&oe=6940FA43',
    title: 'Care in Comfort',
    category: 'Uniforms'
  },
  {
    id: 'g31',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t51.75761-15/473723971_18069617158754000_6231933823107036410_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=D3YgiwqnkXsQ7kNvwEFbhsN&_nc_oc=Adkq6Y0pmRMcbRGCBrURr7IFcaHtm2KsxkUtb4Eh9Vt39AWuxujtw49CpQDlS0_xCCE&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=ys_AtLgL1DzvL6FG7-nBdw&oh=00_Afmz4P4VSiIBLtkUfYsXu7UVqgb8_SFNfduL5TznBGg-2w&oe=6940FB8A',
    title: 'Stethoscope & Tools',
    category: 'Equipment'
  },
  {
    id: 'g32',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/473824015_18069617152754000_769377518856490646_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=0Bn0T_oJV80Q7kNvwGr89Ml&_nc_oc=AdkwZWxOWhiHU8bnkMgADVE4fhqhUHXsFA3galr5NYXZjXPPEwo-Uyar0TyxuyyWC2k&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=uc08AP06cdom8J__6wKYSg&oh=00_AfnLSy2HFp5PHgYeEi7FGY1Dh5LaZEqNq3WQyqMAbSHRBw&oe=6940FF35',
    title: 'Medical Accessories',
    category: 'Accessories'
  },
  {
    id: 'g33',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/466022847_18062561257754000_9109098042114323095_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=2EKycm1OrO4Q7kNvwETLwDs&_nc_oc=Adn8O3d_lLxBhetojVXJsQtsFOgC_2jMtujOpuM5ewHdmFHziiZiY3QPBMQWzLTg-tk&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=48XWwsSpuSeAdgP_6vOasg&oh=00_AflU13zEtK3rdp86fwxcZBv13Z0bMBqn6Pv-7ufnF8QhXQ&oe=694106B1',
    title: 'Modern Healthcare',
    category: 'Scrubs'
  },
  {
    id: 'g34',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/465813737_18062561275754000_8951143827950992937_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Gu2JTP_fbl4Q7kNvwEZIQ-T&_nc_oc=AdkkqA8R-DkTa691uLtIPI1rEek7lnp5gVoHLL9R8LWk-VvGoyVQRLuaLnTkilxkEAU&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=jVAcgaUo6rvmKIqGRq-k7w&oh=00_AfmG1gjepdLW5YkZISGy9Ew3nWPkx_FF6BJk_s2s54l7rw&oe=69411FD2',
    title: 'Premium Quality',
    category: 'Uniforms'
  },
  {
    id: 'g35',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/465822476_18062561296754000_5534356934424156485_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4MvKA9gtroYQ7kNvwH7U53c&_nc_oc=AdmFapLdeo2h_M3TNUsW2ftCnGjf5RUsHvBsna1E8iVIvufbgPy36nd0gNXNhtFqnwY&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=aDfqKNU7x5A-Z-MKMp2Qmw&oh=00_Afl0yy7c3BLrRP-zphOzoTrgsVRyKY6hpXgz5wYLqtRNHw&oe=6941183F',
    title: 'Healthcare Style',
    category: 'Scrubs'
  },
  {
    id: 'g36',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t51.75761-15/463347361_18059943226754000_1856923293473557432_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=R73Y7BdLAdAQ7kNvwEUQiBT&_nc_oc=AdlBw-cLXGkByD3dRUvlUqy2DMioUiJsKqYnrR6Wdl-9q2VERIyygq3vmyfSPLTmVSI&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=FXAWexOc5dqSvegW7vfvbQ&oh=00_Afkmu8LBV7DQHbsKbwfdTjfZT2ougR6eo-QiZy6JmSrQug&oe=69411CD2',
    title: 'New Arrivals',
    category: 'Scrubs'
  },
  {
    id: 'g37',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/468091159_18063795595754000_2105929542224622120_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=wn_cIi-TAGYQ7kNvwFIXgD1&_nc_oc=Adlj6A7-9Yu5Ezb4K4dal_udezF5CQlzb2c9P7qs7hbO5CmyHSEndLtcN_tfOYlOURo&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=v8VGo8ywEGAlMZmJgTV_7w&oh=00_AfmfS0ShlsTSsClghMBvz4R1EYtJG9XeDjYmmxjALdKXiA&oe=6940FFAB',
    title: 'Staff Uniforms',
    category: 'Uniforms'
  },
  {
    id: 'g38',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t39.30808-6/467624679_18063795511754000_8701816835706790505_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tI8sxrOBEtEQ7kNvwHtx3kD&_nc_oc=AdmsrwIczNd0ESjHtdUsI7d9ycgIYoqg6MvptBqZTEsn-JNL3Yy_hSfn4UPO2kcQ1Uk&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=MjECRuNLU-VT8LHkXYcamA&oh=00_AfnDI0-4YXflcZ7e9nNrtT1aOpoPl0PXd61ISGHgEcnSEQ&oe=694129D7',
    title: 'Medical Shoes',
    category: 'Shoes'
  },
  {
    id: 'g39',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/467609695_18063794608754000_3337011296774546867_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ernnF9d9kIsQ7kNvwFNuLpo&_nc_oc=AdlIWZN1pqky89lfOpOCWFj5Kj0ALNrVUR8LqoUwUpDOxC8osszPgvNriH2qlVsGPaM&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=dRr5wLH1pdvosdSQoI6y4g&oh=00_Afnyoaw9uhsWOQ8S9zNBBzFGEJEnj3_hevke-AcMZAWutA&oe=694121FC',
    title: 'The Perfect Fit',
    category: 'Scrubs'
  },
  {
    id: 'g40',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/467842510_18063794944754000_815562848186368274_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1XjB4wQU2fwQ7kNvwHZaqcr&_nc_oc=Adm5IdYWrgeHczD84iXXrIpKoYAru_sDWIi4q6Ow6YZbuxy-GaIqYdJs3doKYq3_ccg&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=Nb1I51vnayvEMq_jtZTjzA&oh=00_Afn27OsTlosmZD2ekLiK8ePe73r0OgVcGgq0Y5kuwBErag&oe=69410A9C',
    title: 'Scrubs for All',
    category: 'Scrubs'
  },
  {
    id: 'g41',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/467655831_18063794644754000_5252665900448323175_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=dlkQMkid_wUQ7kNvwFyoMEF&_nc_oc=Adk8SWOW3f1S_mTEWEHCospDVyH6Wm2Cth4tQNdekLJqjWfESDLd-hW-mAz94_RLWHY&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=2LSS7qu7V4QAUK8LLZ-NYw&oh=00_AfmQ9UV4JylSlbGxs7vLeMTGH7xAn8dxx7Sr0CxXltknkA&oe=69411989',
    title: 'Hospital Ready',
    category: 'Uniforms'
  },
  {
    id: 'g42',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t39.30808-6/467593902_18063794842754000_1043258342032803317_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=C1yuaN3EDi8Q7kNvwFK78pn&_nc_oc=AdmMtJtMRBkNbDWd2JRYp9RJBQ7vRq1tp_YVveWRBzNrmRzjamDM18ISvMjWpdjVtgA&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=wWHSTCoQHPiQmoL069ixPw&oh=00_Afm2AuZbDUtJhCnIGGJIVJ_YcvMYULXjBaBv9_nx2c15EA&oe=69411336',
    title: 'Everyday Comfort',
    category: 'Scrubs'
  },
  {
    id: 'g43',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/467653454_18063795085754000_8982393708945327933_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1KRU31ggwV8Q7kNvwGGXXJd&_nc_oc=Adl38Hj4WVcKI4rzwX7t_uXD8iY3wL_xvBLz5tjZP2WooJbwserX9a4GTfmYGed2LVI&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=LgaIMYogvck12LexZ5JuSg&oh=00_AfmPMFIShq4znwDfh3q7FtQEIc8dTcnBpkfJx4yGPCbx6g&oe=694127E4',
    title: 'Stylish & Functional',
    category: 'Accessories'
  },
  {
    id: 'g44',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/467734942_18063795094754000_776365127608470851_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ltfXi25V2AwQ7kNvwEEhvxC&_nc_oc=AdkZPn-ai_XQ6N32DhRwRloOZ7uwRoVPu-_tu2E6bySSrYeGn6d3CxRj5iNcHPMTPs4&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=OPxnlvE41efY6Mi4jRJX_A&oh=00_Afk-EmTjBO91ONAH5qZrlrAYuNy2ba9qFBlNHSw4k3RAFA&oe=69412433',
    title: 'Elegant Embroidery',
    category: 'Customization'
  },
  {
    id: 'g45',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/467809951_18063793609754000_5516755566370340936_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xd6jQqdMSc4Q7kNvwFO2GHM&_nc_oc=AdlGJByjyHD-VIbN-v_kGRPcHVKvSA_bUtMOZek_fh90JC5Bsv_0gUJrnVZTEg09Fg0&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=K4m8e12qc8uohdUxjN25Wg&oh=00_AfmccadHSZ5a_aeZ2uJszGtjjjni4hPMHp6v2huNgV66GA&oe=6940F9B4',
    title: 'Top Tier Scrubs',
    category: 'Scrubs'
  },
  {
    id: 'g46',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/467510923_18063793618754000_8357020971050440428_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=AHA48Cg9hrIQ7kNvwHtj0ot&_nc_oc=AdnXUffxA2QazOB7CoYhqvTw13yKvKhqXyMui6jcr28aFNt6_zR6oenyaIYvDUcOBxE&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=TlX1dDhn_g7RsZez6aGTnw&oh=00_AfkTwx0sKbg9zetiiO0wMmZ0EmSbLll7RI3COttptf7tPw&oe=69412383',
    title: 'Premium Collection',
    category: 'Uniforms'
  },
  {
    id: 'g47',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/484330116_1071723871637816_3989392044784522867_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=UETD9DpQXREQ7kNvwGU5jev&_nc_oc=AdnxT4aDdBSlJe4sqhnwiuVGBdqm-HkV6Rn4h05iPz1dkpqkdA2zH4TVKaTMfOsPUhw&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=6-wrYMZsrV0AWsLutdKLlA&oh=00_AfkWdJwdA3ofTEx1ZKi8Co8KwIwcYIRunh1ZTxcHEMF5rA&oe=6941220F',
    title: 'Lab Coat Essentials',
    category: 'Lab Coats'
  },
  {
    id: 'g48',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/484351597_1071570794986457_3348693421260936439_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=H-xlVah4_J4Q7kNvwG2H6QS&_nc_oc=Adk78R2d5J-Gej1_2FPR6OF6SNkShAIlIw6CKPd7rVrSswj4I3K0OUP-cEinblQzQT8&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=AiaNiZ45nnuzzn2cRbkk4Q&oh=00_AfkdGW82NKVGGT-j8cuPSjKPia1j_YxK6yfTdjPvDOileQ&oe=6941036B',
    title: 'Modern Lab Coats',
    category: 'Lab Coats'
  },
  {
    id: 'g49',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/483523783_1071571154986421_3203338792227922639_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8eMv7_Xe6iYQ7kNvwGn1ttS&_nc_oc=AdnrnfEkglpzuLw9qtUeHTRGrbGdlN7PrfcSv_L4pz_IiQIc6Onl3es-jkR9cJEG-5U&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=vFZTxx92Xz8uWn3nUW4psw&oh=00_Afmo8B7nuMO9Hj6VycdheZu_XrVdtwZLJ4Hj_xMeOxKCAQ&oe=69412847',
    title: 'Doctor Essentials',
    category: 'Equipment'
  },
  {
    id: 'g50',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/483521935_1071571134986423_7832417184664505552_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=d7PU4ZOmGOAQ7kNvwFXrjmZ&_nc_oc=AdlWS80a1VTqGgqq2HQMD79Mu48fMf9l6YQs-1o2YN1ARlK02vf0b9vjkLbrxLuoHvQ&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=rEjCpku0QfKtfMolT8PNLQ&oh=00_Afk3rogi_OBGqgZvAbWaVLZf7_n49nrrflL-ePBxQ_mItQ&oe=6941128E',
    title: 'Medical Devices',
    category: 'Equipment'
  },
  {
    id: 'g51',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/482828764_1069999038476966_3351985027662797662_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PMuisvVDxu0Q7kNvwF4FVzg&_nc_oc=AdlCalREhWP_Bjf6IlD2McFhrG33hOkXJXkQxW9PlAMaI5p4Sr3fOv1yoFFYPJLAwpc&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=HgtUZ2EW6z_MGnlNQQAQ7w&oh=00_AfmgQSUbNMRpC244aH46UEEPXXYDxy_bLRlkUU65QgAJCg&oe=6941119B',
    title: 'Nurse Shoes',
    category: 'Shoes'
  },
  {
    id: 'g52',
    src: 'https://scontent.fdar5-1.fna.fbcdn.net/v/t39.30808-6/484098051_1069999125143624_8559442881877909951_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=l5yVkbBlsKAQ7kNvwHBmt72&_nc_oc=AdkZyap-XJK_7Lbi6aKhnxdDMLgLbdtIHReyaEW5x9-Sa02N7MFzGmeuzXAJu2o7DWU&_nc_zt=23&_nc_ht=scontent.fdar5-1.fna&_nc_gid=1kY5bPq0r-lHnR0AtDoX4Q&oh=00_Afn3iNrat2ewnL7xKJH-wl_hT1SlAj1oInDy4XvOl-6_6Q&oe=6940F4EA',
    title: 'Clogs and Crocs',
    category: 'Shoes'
  },
  {
    id: 'g53',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t39.30808-6/481704515_1063178392492364_1863406674520911923_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KhpY-oPPnzEQ7kNvwFO0TCd&_nc_oc=AdnkcHYONNBQsXNMDwDWxt2_iZ8j-kD3Q7w9ZxvaRHHErWivOhYYvM5_anklfPN8Uyg&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=9eAb_YiOZg3tymessLd-wg&oh=00_AfkjhgtgfDSHPKXc5xRSuBPZqmRCq1m3G5FmsEPUbYAtdw&oe=6940FE1F',
    title: 'Wardrobe Staples',
    category: 'Scrubs'
  },
  {
    id: 'g54',
    src: 'https://scontent.fdar12-1.fna.fbcdn.net/v/t39.30808-6/482074078_1063178609159009_4127371238705937807_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vds3a4jpnloQ7kNvwG7rczV&_nc_oc=Adn-hXZ9sPXIXVUUTjHbyAHqGEkTmBJowELulFnRPCM71RCJzVeFRjrcl2DhhCnDqmY&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=eELi1KS8wJQYnWft4MDVJg&oh=00_AfnQbsDIBCTIaQ7mhVxG1yislJXJ-0AB9cR9gs-LLO2snw&oe=694129CF',
    title: 'On-Call Style',
    category: 'Uniforms'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Signature Purple Scrub Set',
    description: 'Elegant purple scrubs with stylish ribbon detail. Tailored fit for professionals. As seen in our collection.',
    price: 7150,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 3, // Low stock example
    rating: 4.9,
    reviews: 124
  },
  {
    id: '2',
    name: 'Royal Blue Classic Set',
    description: 'The standard for medical excellence. Durable, color-fast blue scrubs with multiple pockets.',
    price: 5850,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 25,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'Pristine White Lab Coat',
    description: 'Professional length, crisp white fabric with tablet pocket and side vents for access.',
    price: 5200,
    category: Category.LAB_COATS,
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 15,
    rating: 4.8,
    reviews: 56
  },
  {
    id: '4',
    name: 'Men\'s Black Tactical Scrubs',
    description: 'Functional black scrubs with extra cargo pockets. Stylish, masculine fit.',
    price: 6500,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/6129437/pexels-photo-6129437.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 8,
    rating: 4.6,
    reviews: 42
  },
  {
    id: '5',
    name: 'Lavender Scrub Set',
    description: 'Soft lavender tone with a modern fit. Comfortable for long shifts.',
    price: 7800,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 4, // Low stock example
    rating: 4.5,
    reviews: 33
  },
  {
    id: '6',
    name: 'Jumpsuit Scrub',
    description: 'Modern all-in-one jumpsuit design. A stylish utility look for the active nurse.',
    price: 8450,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/8376192/pexels-photo-8376192.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 10,
    rating: 4.9,
    reviews: 21
  },
  {
    id: '7',
    name: 'Littmann Classic III Stethoscope',
    description: 'Industry-leading acoustics. Available in Black, Burgundy, and Navy.',
    price: 14300,
    category: Category.EQUIPMENT,
    image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    stock: 20,
    rating: 5.0,
    reviews: 210
  },
  {
    id: '8',
    name: 'Premium RN Uniform',
    description: 'Distinguished uniform for Registered Nurses. White with distinctive piping options.',
    price: 7150,
    category: Category.UNIFORMS,
    image: 'https://images.pexels.com/photos/5207085/pexels-photo-5207085.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 0, // Out of stock example
    rating: 4.4,
    reviews: 15
  },
  {
    id: '9',
    name: 'Heartbeat Surgical Cap',
    description: 'Comfortable cotton cap with buttons for mask loops. Heartbeat embroidery.',
    price: 2340,
    category: Category.ACCESSORIES,
    image: 'https://images.pexels.com/photos/4586994/pexels-photo-4586994.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 50,
    rating: 4.8,
    reviews: 145
  },
  {
    id: '10',
    name: 'Silicone Nurse Watch',
    description: 'Infection-control friendly fob watch. Pins securely to tunic.',
    price: 1950,
    category: Category.ACCESSORIES,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 30,
    rating: 4.3,
    reviews: 78
  },
  {
    id: '11',
    name: 'Digital Thermometer',
    description: 'Rapid read digital thermometer for clinical use.',
    price: 3250,
    category: Category.EQUIPMENT,
    image: 'https://images.pexels.com/photos/5998465/pexels-photo-5998465.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 100,
    rating: 4.6,
    reviews: 312
  },
  {
    id: '12',
    name: 'Medical Pen Torch',
    description: 'Diagnostic LED penlight. Essential for pupil assessments.',
    price: 1560,
    category: Category.EQUIPMENT,
    image: 'https://images.pexels.com/photos/7659865/pexels-photo-7659865.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 45,
    rating: 4.5,
    reviews: 98
  },
  {
    id: '13',
    name: 'Paediatric Scrub Top',
    description: 'Colorful prints to cheer up young patients. Fun and professional.',
    price: 4550,
    category: Category.SCRUBS,
    image: 'https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 12,
    rating: 4.9,
    reviews: 67
  },
  {
    id: '14',
    name: 'Custom Name Tag',
    description: 'Personalized name badge with magnetic backing. Durable and clear.',
    price: 1300,
    category: Category.CUSTOMIZATION,
    image: 'https://images.pexels.com/photos/7792634/pexels-photo-7792634.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 500,
    rating: 4.7,
    reviews: 450
  },
  {
    id: '15',
    name: 'Embroidery Service',
    description: 'Add your name, title, or hospital logo to any garment. Price per line.',
    price: 1040,
    category: Category.CUSTOMIZATION,
    image: 'https://images.pexels.com/photos/4625624/pexels-photo-4625624.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 999,
    rating: 5.0,
    reviews: 890
  },
  {
    id: '16',
    name: 'Comfort Nursing Clogs',
    description: 'Slip-resistant, lightweight clogs designed for all-day comfort. Easy to clean material.',
    price: 4550,
    category: Category.SHOES,
    image: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 40,
    featured: true,
    rating: 4.6,
    reviews: 112
  },
  {
    id: '17',
    name: 'Medical Crocs - Navy',
    description: 'Breathable and durable Crocs perfect for the operating room or ward rounds.',
    price: 3900,
    category: Category.SHOES,
    image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    stock: 60,
    rating: 4.5,
    reviews: 230
  },
  {
    id: '18',
    name: 'Ergonomic Work Sneakers',
    description: 'Athletic style sneakers with enhanced arch support for healthcare professionals.',
    price: 5850,
    category: Category.SHOES,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 18,
    rating: 4.8,
    reviews: 54
  },
  {
    id: '19',
    name: 'Classic White Crocs',
    description: 'The original comfort clog. Lightweight, water-friendly, and perfect for healthcare settings.',
    price: 3900,
    category: Category.SHOES,
    image: 'https://images.unsplash.com/photo-1603145733190-59811e523c72?auto=format&fit=crop&q=80&w=800',
    stock: 50,
    rating: 4.7,
    reviews: 88
  }
];
