{{ define "affinity" }}
{{- if eq .Release.Namespace "production" }}
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: node-role.kubernetes.io/production
          operator: Exists
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      podAffinityTerm:
        labelSelector:
          matchExpressions:
          - key: instance
            operator: In
            values:
            - {{ .Release.Name }}
        topologyKey: kubernetes.io/hostname
{{- else }}
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: node-role.kubernetes.io/development
          operator: Exists
{{- end }}
{{ end }}