<template>
  <div class="rotate-circle" :title="title">
    <div class="outer-circle"> </div>
    <div class="inner-circle"> </div>
    <span>
      <slot></slot>
    </span>
    
    <span v-for="char, index in title.split('')" :key="index" :class="setClass(index)">{{char}}</span>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scope>
  .rotate-circle {
      position: relative;
      width: 150px;
      height: 150px;
      color: #FFBD8B;
      text-align: center;
      display: table-cell;
      vertical-align:middle;
      span {
        display: inline-block;
        font-size: 24px;
      }
     
      .outer-circle {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 50%;
        top: 0; left: 0;
        background: url(data:image/png;base64,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) no-repeat center;
        animation: rotate-clockwise linear 4s infinite;
        background-size: 100%;
        -webkit-animation: rotate-clockwise linear 4s infinite;
      }

      .inner-circle {
        width: 90%;
        height: 90%;
        position: absolute;
        top: 5%; left: 5%;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB7CAMAAAH73FTlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFQUExURQAAAP7+/v///wDiu/7+/gHhuwHivP7+/gHiuwDivAHhuwHhu/7+/v///wHivADivP7+/v7+/gHivP////7+/v////////7+/gHhvP7+/gHivP7+/v////7+/v7+/gHhvADpv/7+/v7+/gDiv/7+/gDfv/7+/v////7+/gHivADiuf7+/gDjugHhvP7+/v////7+/gHiu/7+/gDfvwDjuwHhu/7+/v7+/gDfvwHhu/7+/gHhu////wHiuwDfuP////7+/v////7+/gDlv/7+/v7+/v7+/v7+/v7+/v///wDivP7+/gDgvADjv/7+/gDhvP///wDivP7+/gDkuf7+/gDhvP7+/v////7+/v7+/gDhvP7+/v///wDiu/7+/gHhvP7+/gDhuwHiu/7+/v////7+/gHiu/7+/v////7+/gHhu/7+/gHiuwDhuv7+/gD/v4U21P8AAABwdFJOUwCvQEhI8/+3q1D7p79Qs1hYx7sEz2AMaL/Xy4MUcBzHDN+LJCQI53iThywsOIPvgJuPNBhAi/ejIJOrgDyfKP+zREwUu1TDXMsIZGRUHNNgEGxsMNtohxh043CPIHx80+t435co8+efMDjj++80pwSeBExjAAAACXBIWXMAABcRAAAXEQHKJvM/AAAGsElEQVRYR8WZ/V/aRhjAg3Zhs7DJeGun0aat6OqKri+wObunWmtlrow5J7VSy6opODr6//+2u8sDSSC53F0gfj8f8zwnHHe5XJ57XjTkJkoPuygdHtniti0oWXppMRUBlDKkUA4xUQ5ZRBnIIb18ZCqfBVvUbMFIALRRtfn9KSouKigdLlEOYYvhxfsvS9tCTRT+fY/PSdNRUtijKDGVctcWR7bQyigJAOAzd13Xn2lrMPYsfBB46NsoA7/bt4VrWiOwR8YbKYEykCuUQYTdxqameTeKHFV60d1PyAP7WNPe+X+hg5IyPk8L5ZDMHiqalg+6rYfLqPjxkTx+rXsMr7AdxHrYol06M/En7AeGn7uXwMXgc58tzMiwa+Ao9+llnam+0I6cKbLuHAzbNAUBvN/WtDr/4xn+x9yJU+PC/fjV+K5yY2lN1HwJmRjfsG2gDCBH/lb0B3ZjDNuQBL5neFrpv9pyBMdc+m2nHkpCFg8SF3RaDiMLYI39HhRQIWoaFQ9XxC4TQhaDQV5WyjNNSx+NnUuh/K3r3/7zzQ8vsHm5B+0u6oo0Sr0Gqook/I4kCWqwg5qLIkoRYGQdr0J29AiPPF8/NlARBpz1A+6L5k9pBpVKmIHypWQflVXpadvY9y63YA6X1O6kbtgNeeiwqkMT00PcJPXeLeItqfemXSOMTQ469d79eeIhnmNDGjauY8/kmA913HhEWG5X5xdzH1ATx7FQN4ntRVWQgnva92zTLUz9AhXk/R1UBDB8ggatC0L2PhHoELRPUQniBpD9xSEFQaamVoJh7MDjqAd1t6t1uQmQUd2SKjz45dkt+U3EeMtOb7aHznbdoakYTu+jJHEYOnJ3reufnv7x5CdsacUenKGqxhmMxfNSGDCyvSVJqpyXDg04QU0NUyRgDmaL63SHsupyUREZB2DN8X8Rl5cazv4BKkgvLHr00vO4wc/twE0ct0mtSR8LaVdoXxGyOB4qw+TCTHAKIxBnulLrPWDg7S2OP30BBoOXfDxmAXDG0gtuU2TGYtuVU5SCjXqgNnHSm57gihPXtA51l5R7r5P9tqiwVRAyrqFuJ0nvlOqi2b0H8YU8pLfpSRlLEb23UkDEIL0TfDeGB+m9IRLL+0N652Wzxw6kd5b8KUJ7KvfOJ8lFufdt6phi3UEe9VsmFJSM6YA9uaNvhEgTNyL5X87QP+orqAlzPrTjH3R9DlVhXHdN3Nm3qApy2xVA/Em6v0ZdiLzHEH+ynWlRPLEcQdf/RU2E0TzTnVuoiOAXGl1uohIGvETFw2lYKMcoBAVlmwJ5uzwE2uCdkDhR0455DnK2XOHlHVdhUP0KYBtKQf6XAd78ri9p8CuYFFIifSmNFMCmuxgxbwJwCwgj1IySnTVm7Kmf0pNj5b/ffl7+ggaoDJlER1T+wjERe+gOWxqzf6juRohAc0IOrrvOdo1Em8zAqt6IluIO5N7XD78axvN+LBk5MoGEfJQzIRobZYCM8rEelcJJD9qRzudIpE0oKWe3I2P04CBSgiQKjX3A0sI1kF2Dnu+RFwsbYIW9b4Uc5FGdLNktKC2h7ksRLE4JPBoNk5NQbJ7CGqpTwYBygJnfhTJ3SaJTMP2P7nOoT8nwu0j6ZVH7UEVtqiyMZ4CT8Aa1KWOMjn0RMZ0twcjYqxCpsCXHArjc/nmooxYL+47ZyraDfftp0KjA4P1egLuoxURx8HybYMkXbaJhgn2MrgXWzaZGHvaYbEers6iQ7QEN73ZAtjQwAbagSK4X8a+3pr2E5+SagmuI5rrMkmRwt8VKA2ikbw7f7zgBmtI5vZ6hadrxWp51C2jpssP2ecxcsZPTcJ9hcbEAtIzThWO7GSc5+7VKwS5rxkiLvVs0X0UtS6x0Bp6gWVm0lbhognq5LSJ9qSTeJDmM/wkjS/F7RUitHJSdnja1ks+7fO/mLGpTpHY8mjlfeUfrGPr32JwaSxaMlZJnWdJTX8bmlNiGso8L+pjdtj73BNvToAMZ3xD+8zIbW/9OunImyLrlX7WhzM6xsT9JVb5EySahznudv9T1949RnywnYNEiMIfXn+mVV/hRwhBNF760IDXBWCjbgYp4nrK5D9aEctnrx1CSTMof9SAZVDETptABuFA4K+4fACQjpBuWEgAHyv2bVYDyucK0WY2uGnXD7OTI8GsjxWMeS+dk2FwaW1FZv7AAKnvFkBxq67BfId+rTjycWcwnyA+TJchUN15dtVpsOQut7kx6tZ9jn1jJN9NNRTVn8hudVMY06XCWWU89PytuS/u0mvY/1mbcRL4X9rQAAAAASUVORK5CYII=) no-repeat center; 
          background-size: 100%;
        animation: rotate-anticlockwise linear 4s infinite;
        -webkit-animation: rotate-anticlockwise linear 4s infinite;
      }
    }

    // 顺时针转动
    @keyframes rotate-clockwise {
      100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
      }
    }

    // 逆时针转动
    @keyframes rotate-anticlockwise {
      100% {
        transform: rotate(-360deg);
        -webkit-transform: rotate(-360deg);
      }
    }
    
    // 圆圈环绕元素
    .rotate-char {
      font: 20px YaHei !important;
      height: 110px;
      position: absolute;
      width: 20px;
      left: 65px;
      bottom: 75px;
      transform-origin: bottom center;
      color: #1DE5BB;
      font-weight: 900;
    }

    @for $i from 1 through 10 {
      .char-right#{$i} {
        transform:rotate((($i - 1) * 16 + 8)+deg)
      }
    }
    @for $i from 1 through 10 {
      .char-left#{$i} {
        transform:rotate((($i - 1) * -16 - 8)+deg)
      }
    }

</style>

<script>
  export default {
    name: 'RotateCircle',
    props: {
      title: String,
      orien: {
        type: String,
        default: 'left'
      }
    },
    methods: {
      setClass: function(index) {
        if (this.orien === 'right') {
          return 'rotate-char char-right' + Number(index + 1)
        } else {
          return 'rotate-char char-left' + Number(index + 1)
        }
      }
    }
  }
</script>
