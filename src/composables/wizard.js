import { useActor } from '@xstate/vue'
import { interpret } from 'xstate'
import { wizard } from '../machines/wizard.js'

const wizardService = interpret(wizard).start()

export function useWizard() {
  return useActor(wizardService)
}