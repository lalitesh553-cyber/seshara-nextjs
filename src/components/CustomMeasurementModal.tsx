'use client'

import { useState } from 'react'

export interface CustomMeasurements {
  height: string
  weight: string
  fitPreference: string

  shoulderLength: string
  armholeRound: string
  upperChestRound: string
  chestRound: string
  lowerChestRound: string
  waistRound: string
  tummy: string
  hipRound: string

  bicep: string
  elbowRounding: string
  sleevesLength: string

  frontNeckLength: string
  backNeckLength: string

  bodiceLength: string
  pointLength: string
  dressLength: string

  cropTopLength: string
  cropTopRound: string

  lehengaLength: string
  pantLength: string

  thigh: string
  ankle: string

  notes: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: CustomMeasurements) => void
}

const emptyMeasurements: CustomMeasurements = {
  height: '',
  weight: '',
  fitPreference: 'Regular',

  shoulderLength: '',
  armholeRound: '',
  upperChestRound: '',
  chestRound: '',
  lowerChestRound: '',
  waistRound: '',
  tummy: '',
  hipRound: '',

  bicep: '',
  elbowRounding: '',
  sleevesLength: '',

  frontNeckLength: '',
  backNeckLength: '',

  bodiceLength: '',
  pointLength: '',
  dressLength: '',

  cropTopLength: '',
  cropTopRound: '',

  lehengaLength: '',
  pantLength: '',

  thigh: '',
  ankle: '',

  notes: '',
}

export default function CustomMeasurementModal({
  open,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] =
    useState<CustomMeasurements>(
      emptyMeasurements
    )

  if (!open) return null

  const update = (
    key: keyof CustomMeasurements,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border:
      '1px solid rgba(139,58,30,0.18)',
    borderRadius: 2,
    fontSize: 14,
  }

  const renderField = (
    label: string,
    key: keyof CustomMeasurements
  ) => (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: 6,
          fontSize: 11,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: 'var(--brown2)',
        }}
      >
        {label}
      </label>

      <input
        value={form[key]}
        onChange={(e) =>
          update(key, e.target.value)
        }
        style={inputStyle}
      />
    </div>
  )

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background:
          'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          width: '100%',
          maxWidth: 900,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#fff',
          borderRadius: 8,
        }}
      >
        <div
          style={{
            padding: 24,
            borderBottom:
              '1px solid rgba(139,58,30,0.08)',
          }}
        >
          <h2
            style={{
              fontFamily:
                'Playfair Display, serif',
              fontWeight: 400,
              color: 'var(--brown)',
            }}
          >
            Custom Measurements
          </h2>

          <p
            style={{
              marginTop: 6,
              color: 'var(--muted)',
            }}
          >
            Provide your measurements for a
            made-to-order garment.
          </p>
        </div>

        <div
          style={{
            padding: 24,
            display: 'grid',
            gap: 24,
          }}
        >
          <section>
            <h3>Basic Details</h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit,minmax(220px,1fr))',
                gap: 16,
              }}
            >
              {renderField(
                'Height',
                'height'
              )}

              {renderField(
                'Weight',
                'weight'
              )}

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontSize: 11,
                    letterSpacing: 1,
                    textTransform:
                      'uppercase',
                  }}
                >
                  Fit Preference
                </label>

                <select
                  value={form.fitPreference}
                  onChange={(e) =>
                    update(
                      'fitPreference',
                      e.target.value
                    )
                  }
                  style={inputStyle}
                >
                  <option>
                    Slim Fit
                  </option>
                  <option>
                    Regular
                  </option>
                  <option>
                    Relaxed Fit
                  </option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h3>
              Upper Body Measurements
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit,minmax(220px,1fr))',
                gap: 16,
              }}
            >
              {renderField(
                'Shoulder Length',
                'shoulderLength'
              )}
              {renderField(
                'Armhole',
                'armholeRound'
              )}
              {renderField(
                'Upper Chest',
                'upperChestRound'
              )}
              {renderField(
                'Chest',
                'chestRound'
              )}
              {renderField(
                'Lower Chest',
                'lowerChestRound'
              )}
              {renderField(
                'Waist',
                'waistRound'
              )}
              {renderField(
                'Tummy',
                'tummy'
              )}
              {renderField(
                'Hip',
                'hipRound'
              )}
              {renderField(
                'Bicep',
                'bicep'
              )}
              {renderField(
                'Elbow',
                'elbowRounding'
              )}
              {renderField(
                'Sleeve Length',
                'sleevesLength'
              )}
            </div>
          </section>

          <section>
            <h3>Neck</h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit,minmax(220px,1fr))',
                gap: 16,
              }}
            >
              {renderField(
                'Front Neck',
                'frontNeckLength'
              )}

              {renderField(
                'Back Neck',
                'backNeckLength'
              )}
            </div>
          </section>

          <section>
            <h3>
              Garment Measurements
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit,minmax(220px,1fr))',
                gap: 16,
              }}
            >
              {renderField(
                'Bodice Length',
                'bodiceLength'
              )}
              {renderField(
                'Point Length',
                'pointLength'
              )}
              {renderField(
                'Dress Length',
                'dressLength'
              )}
              {renderField(
                'Crop Top Length',
                'cropTopLength'
              )}
              {renderField(
                'Crop Top Round',
                'cropTopRound'
              )}
              {renderField(
                'Lehenga Length',
                'lehengaLength'
              )}
              {renderField(
                'Pant Length',
                'pantLength'
              )}
              {renderField(
                'Thigh',
                'thigh'
              )}
              {renderField(
                'Ankle',
                'ankle'
              )}
            </div>
          </section>

          <section>
            <h3>
              Additional Notes
            </h3>

            <textarea
              value={form.notes}
              onChange={(e) =>
                update(
                  'notes',
                  e.target.value
                )
              }
              rows={5}
              style={{
                width: '100%',
                padding: 12,
                border:
                  '1px solid rgba(139,58,30,0.18)',
              }}
            />
          </section>

          <div
            style={{
              display: 'flex',
              gap: 12,
            }}
          >
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: 14,
                border:
                  '1px solid rgba(139,58,30,0.18)',
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onSave(form)
              }
              style={{
                flex: 1,
                padding: 14,
                border: 'none',
                background:
                  'var(--terra)',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Save Measurements
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}