"use client"

import { useEffect, useRef } from "react"

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`

// Full-bleed animated mesh gradient — no transparency, fills entire canvas
const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform float time;
uniform vec2  resolution;
uniform vec3  color1;
uniform vec3  color2;
uniform vec3  color3;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p  = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;

  // Two layers of fbm warping for fluid organic motion
  vec2 q = vec2(fbm(uv + vec2(0.0, 0.0) + time * 0.08),
                fbm(uv + vec2(5.2, 1.3) + time * 0.06));

  vec2 r = vec2(fbm(uv + 4.0 * q + vec2(1.7, 9.2) + time * 0.05),
                fbm(uv + 4.0 * q + vec2(8.3, 2.8) + time * 0.04));

  float f = fbm(uv + 4.0 * r);

  // Remap to [0,1] bands
  float t1 = smoothstep(0.2, 0.8, f);
  float t2 = smoothstep(0.0, 0.6, f + 0.3 * sin(time * 0.3));

  vec3 col = mix(color1, color2, t1);
  col      = mix(col,    color3, t2 * 0.6);

  // Subtle vignette — darkens edges, doesn't go transparent
  float vig = 1.0 - 0.4 * length(uv - 0.5) * 2.0;
  vig = clamp(vig, 0.4, 1.0);

  fragColor = vec4(col * vig, 1.0);
}`

function hexToRgb(hex: string): [number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255]
    : [0.5, 0.5, 0.5]
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error(gl.getShaderInfoLog(s))
  return s
}

interface ShaderBackgroundProps {
  color1?: string
  color2?: string
  color3?: string
}

export function ShaderBackground({
  color1 = "#0B1221",
  color2 = "#1B2A4A",
  color3 = "#2CA5A5",
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl2")
    if (!gl) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, "position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, "time")
    const uRes  = gl.getUniformLocation(prog, "resolution")
    const uC1   = gl.getUniformLocation(prog, "color1")
    const uC2   = gl.getUniformLocation(prog, "color2")
    const uC3   = gl.getUniformLocation(prog, "color3")

    // Use ResizeObserver on the parent so we always get real pixel dimensions
    const resize = () => {
      const parent = canvas.parentElement
      const w = parent ? parent.offsetWidth  : window.innerWidth
      const h = parent ? parent.offsetHeight : window.innerHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = w + "px"
      canvas.style.height = h + "px"
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    resize()

    const c1 = hexToRgb(color1)
    const c2 = hexToRgb(color2)
    const c3 = hexToRgb(color3)

    let raf: number
    const draw = (now: number) => {
      gl.useProgram(prog)
      gl.uniform1f(uTime, now * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform3fv(uC1, c1)
      gl.uniform3fv(uC2, c2)
      gl.uniform3fv(uC3, c3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      gl.deleteProgram(prog)
    }
  }, [color1, color2, color3])

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
}
