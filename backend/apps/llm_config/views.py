import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.llm_config.prompts.cooking import DEFAULT_SYSTEM_PROMPT

LLM_API_URL = os.getenv("LLM_API_URL", "http://llm:11434")


class LLMChatAPIView(APIView):
    """
    フロントから文章を受け取り、
    Ollama (Gemma) に投げて結果を返す API
    """

    def post(self, request):
        prompt = request.data.get("message")

        if not prompt:
            return Response(
                {"error": "message is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            res = requests.post(
                f"{LLM_API_URL}/api/generate",
                json={
                    "model": "llama3.1:8b",
                    "prompt": f"{DEFAULT_SYSTEM_PROMPT}\n{prompt}",
                    "stream": False,
                },
                timeout=60,
            )
            res.raise_for_status()
        except requests.RequestException as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        data = res.json()

        return Response(
            {
                "prompt": prompt,
                "response": data.get("response", ""),
            }
        )
